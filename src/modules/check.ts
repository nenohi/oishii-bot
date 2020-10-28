import { Bot } from '../bot';
import messages from '../messages';
import { Note } from '../misskey/note';
import Module from '../module';
import { TextProcess } from '../utils/text-process';
import variables from '../variables';

export default class extends Module {
    Name = 'Check';
    Regex = new RegExp(`(.+)(は|って)(${variables.food.good}|${variables.food.bad})の?[？?]+`);

    async Run(bot: Bot, note: Note): Promise<void> {
        const match = this.Regex.exec(note.note.text);
        if (!match) return;
        const text = TextProcess.removeSpace(match[1]);

        const ng = note.findNGWord(bot.ngWords);
        if (ng) {
            note.reply(messages.food.ngWord);
            this.log('NG WORD:', ng);
            return;
        }

        const query = {
            text: 'SELECT good FROM oishii_table WHERE LOWER(name) = LOWER($1)',
            values: [text],
        };
        const res = await bot.runQuery(query);
        if (!res) return;

        if (res.rowCount < 1) {
            const noun = await isNoun(text);
            if (noun) {
                note.reply(messages.food.idk);
            } else {
                note.reply(messages.food.canEat);
            }
            return;
        }

        const isGood = res.rows[0].good;
        const goodText = isGood ? messages.food.good : messages.food.bad;
        note.reply(goodText);
    }
}

async function isNoun(text: string): Promise<boolean> {
    console.log('Check noun:', text);
    const nouns = await TextProcess.getNouns(text);
    return nouns ? true : false;
}