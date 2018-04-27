/**
 * 常用数学函数
 */

var MathUtils = {
};

/**
 * 生成范围随机整数[begin, end]
 */
MathUtils.randInt = function (begin, end) {
    return Math.floor(Math.random() * (end - begin + 1) + begin);
}

/**
 * 将输入num限定在之间[begin, end]
 */
MathUtils.between = function (num, begin, end) {
    return Math.min(Math.max(num, begin), end);
}

module.exports = MathUtils;