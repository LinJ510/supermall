module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                //配置别名
                //一般已经默认配置'@'：'src'
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}
