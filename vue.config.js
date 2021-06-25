module.exports = {
        // 配置路径别名
        configureWebpack: {
            resolve: {
                alias: {
                    'assets': '@/assets',
                    'common': 'components/common',
                    'content': 'components/content',
                    'components': '@/components',
                    'network': '@/network',
                    'views': '@/views',
                }
            }
        }
    }
    // 1