export default {
    food: {
        good: '((おい|美味)し|(まず|マズ|不味)く(な|にゃ)|うま|旨)い',
        bad: '(まず|マズ|不味|(おい|美味)しく(な|にゃ)|(うま|旨)く(な|にゃ))い',
        foods: [
            { emoji: '🍇', keywords: ['grapes', 'ぶどう', 'ブドウ', '葡萄'] },
            { emoji: '🍈', keywords: ['melon', 'メロン', '舐瓜'] },
            { emoji: '🍉', keywords: ['watermelon', 'スイカ', '西瓜'] },
            { emoji: '🍊', keywords: ['tangerine', 'オレンジ', 'みかん', '蜜柑'] },
            { emoji: '🍋', keywords: ['lemon', 'レモン', '檸檬'] },
            { emoji: '🍌', keywords: ['banana', 'バナナ'] },
            { emoji: '🍍', keywords: ['pineapple', 'パイナップル'] },
            { emoji: '🥭', keywords: ['mango', 'マンゴー'] },
            { emoji: '🍎', keywords: ['red apple', 'りんご', 'リンゴ', '林檎'] },
            { emoji: '🍏', keywords: ['green apple', '青りんご', '青リンゴ', '青林檎'] },
            { emoji: '🍐', keywords: ['pear', 'ナシ', '梨'] },
            { emoji: '🍑', keywords: ['peach', 'モモ', '桃'] },
            { emoji: '🍒', keywords: ['cherries', 'さくらんぼ', '桜桃'] },
            { emoji: '🍓', keywords: ['strawberry', 'いちご', '苺'] },
            { emoji: '🫐', keywords: ['blueberries', 'ブルーベリー'] },
            { emoji: '🥝', keywords: ['kiwi fruit', 'キウイ'] },
            { emoji: '🍅', keywords: ['tomato', 'トマト'] },
            { emoji: '🫒', keywords: ['olive', 'オリーブ'] },
            { emoji: '🥥', keywords: ['coconut', 'ココナッツ'] },
            { emoji: '🥑', keywords: ['avocado', 'アボカド'] },
            { emoji: '🍆', keywords: ['eggplant', 'ナス', '茄子'] },
            { emoji: '🥔', keywords: ['potato', 'ポテト', 'じゃがいも'] },
            { emoji: '🥕', keywords: ['carrot', 'にんじん', '人参'] },
            { emoji: '🌽', keywords: ['ear of corn', 'とうもろこし', 'コーン'] },
            { emoji: '🌶', keywords: ['hot pepper', 'とうがらし', '唐辛子'] },
            { emoji: '🫑', keywords: ['bell pepper', 'ピーマン'] },
            { emoji: '🥒', keywords: ['cucumber', 'きゅうり'] },
            { emoji: '🥬', keywords: ['leafy green', '野菜'] },
            { emoji: '🥦', keywords: ['broccoli', 'ブロッコリー'] },
            { emoji: '🧄', keywords: ['garlic', 'ガーリック', 'にんにく'] },
            { emoji: '🧅', keywords: ['onion', 'オニオン', 'たまねぎ', '玉ねぎ'] },
            { emoji: '🍄', keywords: ['mushroom', 'きのこ', 'マッシュルーム'] },
            { emoji: '🥜', keywords: ['peanuts', 'ピーナッツ'] },
            { emoji: '🌰', keywords: ['chestnut', '栗', 'くり'] },
            { emoji: '🍞', keywords: ['bread', 'パン'] },
            { emoji: '🥐', keywords: ['croissant', 'クロワッサン'] },
            { emoji: '🥖', keywords: ['baguette bread', 'バゲット', 'フランスパン'] },
            { emoji: '🫓', keywords: ['flatbread', 'フラットブレッド'] },
            { emoji: '🥨', keywords: ['pretzel', 'プレッツェル'] },
            { emoji: '🥯', keywords: ['bagel', 'ベーグル'] },
            { emoji: '🥞', keywords: ['pancakes', 'パンケーキ', 'ホットケーキ'] },
            { emoji: '🧇', keywords: ['waffle', 'ワッフル'] },
            { emoji: '🧀', keywords: ['cheese wedge', 'チーズ'] },
            { emoji: '🍖', keywords: ['meat on bone', '骨付き肉'] },
            { emoji: '🍗', keywords: ['poultry leg', '骨付きチキン'] },
            { emoji: '🥩', keywords: ['cut of meat', '肉'] },
            { emoji: '🥓', keywords: ['bacon', 'ベーコン'] },
            { emoji: '🍔', keywords: ['hamburger', 'ハンバーガー'] },
            { emoji: '🍟', keywords: ['french fries', 'フライドポテト', 'フレンチフライ'] },
            { emoji: '🍕', keywords: ['pizza', 'ピザ'] },
            { emoji: '🌭', keywords: ['hot dog', 'ホットドッグ'] },
            { emoji: '🥪', keywords: ['sandwich', 'サンドイッチ'] },
            { emoji: '🌮', keywords: ['taco', 'タコス'] },
            { emoji: '🌯', keywords: ['burrito', 'ブリート'] },
            { emoji: '🫔', keywords: ['tamale', 'タマル'] },
            { emoji: '🥙', keywords: ['stuffed flatbread', 'ギロピタ'] },
            { emoji: '🧆', keywords: ['falafel', 'ファラフェル'] },
            { emoji: '🥚', keywords: ['egg', '卵', '玉子', 'たまご'] },
            { emoji: '🍳', keywords: ['cooking', '料理'] },
            { emoji: '🥘', keywords: ['shallow pan of food', '浅い鍋'] },
            { emoji: '🍲', keywords: ['pot of food', '鍋'] },
            { emoji: '🫕', keywords: ['fondue', 'フォンデュ'] },
            { emoji: '🥣', keywords: ['bowl with spoon', 'ボウルとスプーン'] },
            { emoji: '🥗', keywords: ['green salad', 'サラダ'] },
            { emoji: '🍿', keywords: ['popcorn', 'ポップコーン'] },
            { emoji: '🧈', keywords: ['butter', 'バター'] },
            { emoji: '🧂', keywords: ['salt', '塩'] },
            { emoji: '🥫', keywords: ['canned food', '缶詰'] },
            { emoji: '🍱', keywords: ['bento box', '弁当'] },
            { emoji: '🍘', keywords: ['rice cracker', 'せんべい'] },
            { emoji: '🍙', keywords: ['rice ball', 'おにぎり'] },
            { emoji: '🍚', keywords: ['cooked rice', 'ご飯', 'ごはん'] },
            { emoji: '🍛', keywords: ['curry rice', 'カレー'] },
            { emoji: '🍜', keywords: ['steaming bowl', 'どんぶり', 'ラーメン'] },
            { emoji: '🍝', keywords: ['spaghetti', 'スパゲッティ'] },
            { emoji: '🍠', keywords: ['roasted sweet potato', 'スイートポテト'] },
            { emoji: '🍢', keywords: ['oden', 'おでん'] },
            { emoji: '🍣', keywords: ['sushi', 'すし', '寿司', '鮨'] },
            { emoji: '🍤', keywords: ['fried shrimp', '天ぷら'] },
            { emoji: '🍥', keywords: ['fish cake with swirl', 'なると'] },
            { emoji: '🥮', keywords: ['moon cake', '月餅'] },
            { emoji: '🍡', keywords: ['dango', '団子'] },
            { emoji: '🥟', keywords: ['dumpling', '餃子'] },
            { emoji: '🥠', keywords: ['fortune cookie', 'フォーチュンクッキー'] },
            { emoji: '🥡', keywords: ['takeout box', 'テイクアウトボックス'] },
            { emoji: '🦀', keywords: ['crab', 'カニ', '蟹'] },
            { emoji: '🦞', keywords: ['lobster', 'ロブスター'] },
            { emoji: '🦐', keywords: ['shrimp', 'エビ', '海老'] },
            { emoji: '🦑', keywords: ['squid', 'イカ', '烏賊'] },
            { emoji: '🐙', keywords: ['octopus', 'タコ', '蛸'] },
            { emoji: '🦪', keywords: ['oyster', 'カキ', '牡蠣'] },
            { emoji: '🍦', keywords: ['soft ice cream', 'ソフトクリーム'] },
            { emoji: '🍧', keywords: ['shaved ice', 'シャーベット'] },
            { emoji: '🍨', keywords: ['ice cream', 'アイスクリーム', 'アイス'] },
            { emoji: '🍩', keywords: ['doughnut', 'ドーナツ', 'ドーナッツ'] },
            { emoji: '🍪', keywords: ['cookie', 'クッキー'] },
            { emoji: '🎂', keywords: ['birthday cake', '誕生日ケーキ'] },
            { emoji: '🍰', keywords: ['shortcake', 'ショートケーキ', 'ケーキ'] },
            { emoji: '🧁', keywords: ['cupcake', 'カップケーキ'] },
            { emoji: '🥧', keywords: ['pie', 'パイ'] },
            { emoji: '🍫', keywords: ['chocolate bar', 'チョコ'] },
            { emoji: '🍬', keywords: ['candy', 'キャンディー', 'あめ'] },
            { emoji: '🍭', keywords: ['lollipop', 'ロリポップ', 'あめ', 'ペロペロキャンディー'] },
            { emoji: '🍮', keywords: ['custard', 'プリン'] },
            { emoji: '🍯', keywords: ['honey pot', 'はちみつ', 'ハニー'] },
            { emoji: '🍼', keywords: ['baby bottle', '哺乳瓶'] },
            { emoji: '🥛', keywords: ['glass of milk', '牛乳', 'ミルク'] },
            { emoji: '☕', keywords: ['hot beverage', 'コーヒー'] },
            { emoji: '🫖', keywords: ['teapot', 'ティーポット'] },
            { emoji: '🍵', keywords: ['teacup without handle', 'お茶'] },
            { emoji: '🍶', keywords: ['sake', '酒'] },
            { emoji: '🍾', keywords: ['bottle with popping cork', 'コルクボトル'] },
            { emoji: '🍷', keywords: ['wine glass', 'ワイン'] },
            { emoji: '🍸', keywords: ['cocktail glass', 'カクテル'] },
            { emoji: '🍹', keywords: ['tropical drink', 'トロピカルドリンク'] },
            { emoji: '🍺', keywords: ['beer mug', 'ビール'] },
            { emoji: '🍻', keywords: ['clinking beer mugs', '乾杯'] },
            { emoji: '🥂', keywords: ['clinking glasses', '乾杯'] },
            { emoji: '🥃', keywords: ['tumbler glass', 'タンブラー', 'ウイスキー'] },
            { emoji: '🥤', keywords: ['cup with straw', 'ストロー'] },
            { emoji: '🧋', keywords: ['bubble tea', 'タピオカ'] },
            { emoji: '🧃', keywords: ['beverage box', 'パック飲料'] },
            { emoji: '🧉', keywords: ['mate', 'マテ茶'] },
            { emoji: '🧊', keywords: ['ice', '氷', 'アイス'] },
            { emoji: '🥢', keywords: ['chopsticks', '箸'] },
            { emoji: '🍽', keywords: ['fork and knife with plate', 'プレート'] },
            { emoji: '🍴', keywords: ['fork and knife', 'ナイフとフォーク'] },
            { emoji: '🥄', keywords: ['spoon', 'スプーン'] },
            { emoji: '🔪', keywords: ['kitchen knife', '包丁'] },
            { emoji: '🏺', keywords: ['amphora', 'アンフォラ'] },
        ],
        chocolates: ['🍫', '🍪'],
    },
};
