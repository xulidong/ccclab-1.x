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

module.exports = MathUtils;