var poems = [
    [
        '春晓',
        '孟浩然',
        '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少',
    ],
    [
        '满江红',
        '岳飞',
        '怒发冲冠，凭阑处、潇潇雨歇。抬望眼、仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切。靖康耻，犹未雪；臣子恨，何时灭。驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头、收拾旧山河，朝天阙。'
    ],
    [
        '雁门太守行',
        '李贺',
        '黑云压城城欲摧，甲光向日金鳞开。角声满天秋色里，塞上燕脂凝夜紫。半卷红旗临易水，霜重鼓寒声不起。报君黄金台上意，提携玉龙为君死。'
    ],
    [
        '草',
        '白居易',
        '离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。远芳侵古道，晴翠接荒城。又送王孙去，萋萋满别情。'
    ],
]

var characters = poems.map(x => x.join('')).join('')

var chinese = characters.replace(/[，。；、]/g, '')

/*
 * @param length The number of the length of the result string.
 * @param mode ('full' or 'half' or 'mix') to get a full-width or half-width or full/half-mixed result.
 * @param byte ('true' or 'false') Length of string is count by byte or character.
 */
function randomString(length, mode='full', byte=false) {
    var randomChineseChar = () => {
        // parts of chinese char field.
        var charFrom = 19968,
            charTo = 20968,
            maxLen = charTo - charFrom
        return String.fromCharCode(charFrom + Math.floor(Math.random() * maxLen))
    }

    var randomFullWidthChar = () => {
        return chinese[Math.floor(Math.random() * chinese.length)]
    }

    var randomHalfChar = () => {
        var strRepo = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        return strRepo.charAt(Math.floor(Math.random() * strRepo.length))
    }

    var rest = length
    var resultStr = ''

    while (true) {
        if (rest == 0) {
            break
        }

        var getHalfChar = mode =='half'
            || (rest == 1 && byte)
            || (mode == 'mix' && Math.random() > 0.5)

        if (getHalfChar) {
            resultStr += randomHalfChar()
            rest--
        }
        else {
            resultStr += randomFullWidthChar()
            rest -= byte ? 2 : 1
        }
    }
    return resultStr
}

module.exports = {
    poems: poems,
    characters: characters,
    chinese: chinese,
    randomString: randomString,
}
