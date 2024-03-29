const path = require("path")


module.exports = {
    entry: {
        app: './src/index.js',
    
    },
 
    output:{
        path: path.resolve(__dirname, "dist/"),
        filename: "[name].bundle.js",
        publicPath:"/",
        clean:true,
    },

    module:{

        rules:[
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
      
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
        ]

      
    },
    
}