require('newrelic');
const kuromoji = require('kuromoji');
const ws_const = require('ws');
const WebSocket = require('reconnecting-websocket');
const { Client } = require('pg');
const { messages, variables } = require('./config.json');
const psql = new Client({
    ssl: true,
    connectionString: process.env.DATABASE_URL
});

psql.connect();
// const testQuery = {
//     // text: 'SELECT count(*), count(learned = true or null) FROM oishii_table'
//     text: 'select learned, count(learned) from oishii_table group by learned'
// };
// console.time('test');
// client.query(testQuery).then(res => {
//     console.log(res);
//     // console.log(res.rows[0].count);
//     console.dir(res.rows);
// });
// console.timeEnd('test');

const ws = new WebSocket(process.env.STREAMING_URL, [], {
    WebSocket: ws_const
});
const builder = kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" });

const timelineData = {
    type: "connect",
    body: {
        // channel: "localTimeline",
        channel: "hybridTimeline",
        id: "1803ad27-a839-4eb6-ac74-97677ee0a055"
    }
};
const mainData = {
    type: "connect",
    body: {
        channel: "main",
        id: "69d71556-8747-4287-b849-d3957d33baa7"
    }
};

ws.on('open', function() {
    ws.send(JSON.stringify(timelineData));
    ws.send(JSON.stringify(mainData));
    console.log('Connected!');
});
ws.on('close', function() {
    console.log('Disconnected.');
});

ws.on('message', function(data){
    // console.log('----------Start----------');
    const json = JSON.parse(data.data);

    if (json.body.id === '1803ad27-a839-4eb6-ac74-97677ee0a055') { //Timeline
        // console.dir(json);

        if (json.body.body.userId === process.env.USER_ID) return;
        let text = json.body.body.text;
        if (text === null) return;
        if (json.body.body.cw !== null) return;
        if (/@oishiibot/.test(text)) return;

        // heroku DB 制限
        psql.query('SELECT count(*) FROM oishii_table').then(res => {
            const count = res.rows[0].count;
            const db = variables.db;
            if (Number(count) > db.deleteCountCond) { // config.json => variables.db.deleteCountCond件以上なら
                const deleteQuery = {
                    text: 'DELETE FROM oishii_table WHERE name in (SELECT name FROM oishii_table WHERE learned = false LIMIT $1)',
                    values: [ db.deleteNum ]
                }
                psql.query(deleteQuery).then(() => {
                    console.log(`DELETE: ${count} > ${db.deleteCountCond} -${db.deleteNum} => ${count - db.deleteNum}`)
                    sendText(`${messages.deleteDB[0]}${db.deleteCountCond}${messages.deleteDB[1]}${db.deleteNum}${messages.deleteDB[2]}`);
                })
                .catch(e => console.log(e));
            }
        })
        .catch(e => console.log(e));

        //URLを消す
        text = text.replace(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=@]*)?/g, '');
        // メンションを消す
        text = text.replace(/@[\w_]+@?[\w.-]*\s+/g, '');

        builder.build((err, tokenizer) => {
            if (err) throw err;

            //名詞のみ取り出す
            const tokens = tokenizer.tokenize(text);
            const pos_arr = tokens.map(token => {
                return token.pos === '名詞' && token.pos_detail_1 !== 'サ変接続' ? token.surface_form : null;
            });
            const nouns = pos_arr.filter(n => n !== null);
            // console.log(`nouns: ${nouns}`);
            //もし何もなかったら
            if (nouns.length < 1) return;

            //1文字のひらがな・カタカナを消す
            const output = nouns.filter(n => n.search(/^[ぁ-んァ-ン]$/));
            // console.log(`output: ${output}`);
            //もし何もなかったら
            if (output.length < 1) return;

            //どれか1つ選ぶ
            const add_name = output[Math.floor(Math.random() * output.length)];
            // console.log(`add_name: ${add_name}`);

            //被り
            getExists(add_name)
            .then(res => {
                if (res === true) {
                    // console.log(`if: ${res}`);
                    throw `${add_name} is skipped.`;
                }
            }).then(() => {
                //Add DB
                const is_good = Math.random() > 0.25 ? 'true' : 'false';
                const add_query = {
                    text: 'INSERT INTO oishii_table ( name, good ) VALUES ( $1, $2 )',
                    values: [ add_name, is_good ]
                };
                psql.query(add_query)
                .then(() => console.log(`INSERT: ${add_name} (${is_good})`))
                .catch(e => console.error(e.stack));
            }).catch(e => console.log(e));
        });
    }

    if (json.body.id === '69d71556-8747-4287-b849-d3957d33baa7') { //Main
        if (json.body.type === 'notification') return;

        if (json.body.type === 'followed') { //follow back
            // console.dir(json);
            ws.send(JSON.stringify({
                type: 'api',
                body: {
                    id: uuid(),
                    endpoint: 'following/create',
                    data: {
                        userId: json.body.body.id
                    }
                }
            }));
        }

        if (json.body.type === 'mention') {
            // console.dir(json);

            // Bot属性を無視
            if (json.body.body.user.isBot === true) return;

            let text = json.body.body.text;
            if (text === null) return;
            text = text.replace(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=@]*)?/g, '');
            text = text.replace(/@oishiibot(@misskey\.io)? /, '');
            console.log(`json text:${text}`);

            const note_id = json.body.body.id;
            const reactionData = {
                type: 'api',
                body: {
                    id: uuid(),
                    endpoint: 'notes/reactions/create',
                    data: {
                        noteId: note_id,
                        reaction: 'pudding'
                    }
                }
            };
            if (text.match(/^\s*かわいい*[！!]*\s*$/)) reactionData.body.data.reaction = 'love';
            ws.send(JSON.stringify(reactionData));

            let m;
            // Commands
            m = text.match(/^\s*\/help\s*$/);
            if (m) { // help
                console.log('COMMAND: help');
                sendText(messages.commands.help, note_id);
                return;
            }
            m = text.match(/^\s*\/ping\s*$/);
            if (m) { // ping
                console.log('COMMAND: ping');
                sendText(messages.commands.ping, note_id);
                return;
            }
            m = text.match(/^\s*\/info\s*$/);
            if (m) { // info
                console.log('COMMAND: info');
                psql.query('SELECT learned, count(learned) FROM oishii_table GROUP BY learned').then(res => {
                    const fl = res.rows[0].count;
                    const tl = res.rows[1].count;
                    const all = Number(fl) + Number(tl);
                    const text = `Records: ${all.toString()} (Learned: ${tl})`;
                    console.log(`COMMAND: info[ ${text} ]`);
                    sendText(text, note_id);
                });
                return;
            }
            m = text.match(/^\s*\/say\s*$/);
            if (m) { // say
                console.log('COMMAND: say');
                if (json.body.body.user.username === 'kabo') {
                    sayFood();
                } else {
                    sendText(messages.commands.denied, note_id);
                }
                return;
            }

            // Text
            m = text.match(`(.+)(は|って)(${variables.food.good}|${variables.food.bad})[？?]+`);
            if (m) { // check
                (async () => {
                    const text = replaceSpace(m[1]);
                    const query = {
                        text: 'SELECT good FROM oishii_table WHERE name=$1',
                        values: [text]
                    };
                    psql.query(query)
                    .then(res => {
                        console.dir(res);
                        if (res.rowCount < 1) {
                            isNoun(text).then(is_noun => {
                                if (is_noun) {
                                    sendText(messages.food.idk, note_id);
                                } else {
                                    sendText(messages.food.canEat, note_id);
                                }
                            });
                            return;
                        }
                        const isGood = res.rows[0].good;
                        const Tgood = isGood ? messages.food.good : messages.food.bad;
                        console.log(`CHECK: ${text}`);
                        sendText(Tgood, note_id);
                    })
                    .catch(e => console.log(e));
                })();
                return;
            }
            m = text.match(`(.+)[はも](${variables.food.good}|${variables.food.bad})よ?[！!]*`);
            if (m) { // learn
                (async () => {
                    const text = replaceSpace(m[1]);
                    const is_good = m[2].match(`(${variables.food.good})`) ? true : false;
                    const isExists = await getExists(text);
                    if (isExists) {
                        const update_query = {
                            text: 'UPDATE oishii_table SET good=$1, learned=true WHERE name=$2',
                            values: [is_good, text]
                        };
                        psql.query(update_query)
                            .then(() => console.log(`LEARN(UPDATE): ${text} is ${is_good}`))
                            .catch(e => console.error(e.stack));
                    } else {
                        const add_query = {
                            text: 'INSERT INTO oishii_table ( name, good, learned ) VALUES ( $1, $2, true )',
                            values: [text, is_good]
                        };
                        psql.query(add_query)
                            .then(() => console.log(`LEARN(INSERT): ${text} is ${is_good}`))
                            .catch(e => console.error(e.stack));
                    }
                    sendText(`${text}${messages.food.is}${m[2]}\n${messages.food.learn}`, note_id);
                })();
                return;
            }
            m = text.match(`(${variables.food.good}|${variables.food.bad})(もの|物|の)は?(何|なに)?[？?]*`);
            if (m) { // search
                (async () => {
                    const is_good = m[1].match(`(${variables.food.good})`) ? true : false;
                    const search_query = {
                        text: 'SELECT name FROM oishii_table WHERE good=$1',
                        values: [is_good]
                    };
                    psql.query(search_query)
                        .then(res => {
                            // console.dir(res);
                            const row = res.rows[Math.floor(Math.random() * res.rowCount)];
                            // console.dir(row);
                            const igt = is_good ? messages.food.good : messages.food.bad;
                            console.log(`SERACH: ${row.name} (${is_good})`);
                            sendText(`${row.name}${messages.food.is}${igt}`, note_id);
                        })
                        .catch(e => console.error(e.stack));
                })();
                return;
            }
        }
    }
});

setInterval(() => {
    sayFood();
}, 1000 * 60 * process.env.INTERVAL_MIN);


function sayFood() {
    let text = '', name = '', good = '';
    const query = {
        text: 'SELECT (name, good) FROM oishii_table'
    };
    psql.query(query)
        .then(res => {
            // console.log(res);
            const re = /\((.+),([tf])\)/;
            const row = res.rows[Math.floor(Math.random() * res.rowCount)].row;
            console.log(`row: ${row}`);
            name = row.match(re)[1];
            good = row.match(re)[2];
        })
        .then(() => {
            text = name;
            text += good === 't' ? messages.food.good : messages.food.bad;
            console.log(`POST: ${text}`);
            sendText(text);
        })
        .catch(e => console.error(e.stack));
}

function sendText(text, reply_id) {
    const sendData = {
        type: 'api',
        body: {
            id: uuid(),
            endpoint: 'notes/create',
            data: {
                visibility: "public",
                text: text,
                localOnly: false,
                geo: null
            }
        }
    };
    if (reply_id) sendData.body.data.replyId = reply_id;
    ws.send(JSON.stringify(sendData));
}

function uuid() {
    let uuid = '', i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += '-';
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

function getExists(text) {
    return new Promise(resolve => {
        const query = {
            text: 'SELECT EXISTS (SELECT * FROM oishii_table WHERE name = $1)',
            values: [ text ]
        };
        psql.query(query)
        .then(res => {
            // console.log(`func: ${res.rows[0].exists}`);
            resolve(res.rows[0].exists);
        })
        .catch(e => console.error(e.stack));
    });
}

function isNoun(text) {
    return new Promise(resolve => {
        console.log(`is_noun text: ${text}`);
        builder.build((err, tokenizer) => {
            if (err) throw err;

            //名詞のみ取り出す
            const tokens = tokenizer.tokenize(text);
            const pos_arr = tokens.map(token => {
                return token.pos === '名詞' && token.pos_detail_1 !== 'サ変接続' ? token.surface_form : null;
            });
            const nouns = pos_arr.filter(n => n !== null);
            console.log(`nouns: ${nouns}`);
            //もし何もなかったら
            if (nouns.length < 1) resolve(false);

            //1文字のひらがな・カタカナを消す
            const output = nouns.filter(n => n.search(/^[ぁ-んァ-ン]$/));
            if (output) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

function replaceSpace(text) {
    return text.replace(/^\s+|\s+$/g, '')
}