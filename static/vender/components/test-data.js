import $ from 'jquery';

var shanghai = [
    {value: 0, name: '侬好', description: '意思是你好。'},
    {value: 1, name: '老克拉', description: '时髦老头。'},
    {value: 2, name: '上只角', description: 'Uptown。',},
];

var japanese = [
    {value: 0, name: '100元', description: '読み方は「ひゃくえん」です。'},
    {value: 1, name: '少女', description: '読み方は「しょうじょ」です。'},
    {value: 2, name: '知らん', description: '「知らない」の略です。',},
    {value: 3, name: '運転', description: '読み方は「うんてん」です。'},
    {value: 4, name: '嵐', description: '読み方は「あらし」です。'},
    {value: 5, name: '確認', description: '読み方は「かくにん」です。'},
    {value: 6, name: '木村拓哉', description: 'スーパースターです。'},
    {value: 7, name: '久しぶりだ', description: '「ご無沙汰です」に似てる。'},
    {value: 8, name: '松嶋菜々子', description: '美しい美人です。'},
    {value: 9, name: '終わり', description: '野望と願いを阻んできた。'},
];

var chinese = [
    {value: 0, name: '100元', description: '也就是十个十元。'},
    {value: 1, name: '少女', description: '豆蔻年华。'},
    {value: 2, name: '不知道', description: '地方方言读作知不道。',},
    {value: 3, name: '老司机', description: '老司机带带我。'},
    {value: 4, name: '岚', description: '风暴来了。'},
    {value: 5, name: '确认', description: '拼音写作queren。'},
    {value: 6, name: '木村拓哉', description: 'SMAP成员。'},
    {value: 7, name: '好久不见', description: '好久不见。'},
    {value: 8, name: '古畑任三郎', description: '我是古畑任三郎。'},
    {value: 9, name: '结束', description: '一共十个属性。'},
];

var english = [
    {value: 0, name: '100 USD', description: 'One hundred dollar.'},
    {value: 1, name: 'Girl', description: 'Beautiful and young woman.'},
    {value: 2, name: 'BTW', description: 'By the way.',},
    {value: 3, name: 'SSMS', description: 'Sql Server Management Studio.'},
    {value: 4, name: 'Blizzard', description: 'Blizzard Entertaiment'},
    {value: 5, name: 'Confirm', description: 'I am almost forgot all the english words.'},
    {value: 6, name: 'Kimura Takuya', description: 'A superstart of SMAP.'},
    {value: 7, name: 'Over', description: 'Eight words in all.'},
];

export var meta = [
    {code: 'Chinese', name: '中文', details: chinese, multiSelect: false, },
    {code: 'English', name: 'English', details: english, multiSelect: false, },
    {code: 'Japanese', name: '日本語', details: japanese, multiSelect: false, },
    {code: 'Shanghai', name: '上海话', details: shanghai, multiSelect: false, },
    {code: 'Chinese2', name: '中文２', details: $.extend(true, [], chinese), multiSelect: true, },
    {code: 'English2', name: 'English２', details: $.extend(true, [], english), multiSelect: true, },
    {code: 'Japanese2', name: '日本語２', details: $.extend(true, [], japanese), multiSelect: true, },
];

export var approaches = [
    [
        {code: 'Chinese', value: 1, },
        {code: 'English', value: 2, },
        {code: 'Japanese', value: 16, },
        {code: 'Shanghai', value: 1, },
        {code: 'Chinese2', value: 5, },
    ],
    [
        {code: 'Shanghai', value: 2, },
        {code: 'Chinese', value: 12, },
        {code: 'Chinese2', value: 5, },
    ],
    [
        {code: 'Chinese', value: 1, },
        {code: 'English', value: 2, },
        {code: 'Japanese', value: 3, },
        {code: 'Chinese2', value: 5, },
    ],
    [
        {code: 'Chinese', value: 1, },
        {code: 'Chinese2', value: 15, },
        {code: 'English', value: 21, },
        {code: 'Japanese', value: 8, },
    ],
];