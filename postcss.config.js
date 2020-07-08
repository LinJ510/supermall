module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth: 375,//视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,//视窗的高度，对应的是我们设计稿的高度（可以不配置）
      unitPrecision: 5,//指定‘px’转换为视窗单位值的小数位数（很多时候没有绑法整除）
      viewportUnit: 'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类
      //ignore在id后面加上ignore就可以变成不需要转换的类
      minPixelValue: 1,//小于或等于‘1px’不转换为视窗 单位
      mediaQuery: false,//允许媒体查询中转换px
      exclude: []//里面必须是正则表达式
    }
  }
}
