module.exports= (def) => {
    let option;
    
   
        if(def.vue===true){
            option={
                "dependencies": {
                    "autoprefixer": "^8.6.5",
                    "axios": "^0.18.0",
                    "babel-core": "^6.26.3",
                    "babel-loader": "^7.1.5",
                    "babel-plugin-transform-object-rest-spread": "^6.26.0",
                    "babel-plugin-transform-runtime": "^6.23.0",
                    "babel-polyfill": "^6.26.0",
                    "babel-preset-es2015": "^6.24.1",
                    "babel-preset-es2016": "^6.24.1",
                    "babel-runtime": "^6.26.0",
                    "clean-webpack-plugin": "^0.1.19",
                    "css-loader": "^1.0.0",
                    "cross-env": "^5.2.0",
                    "extract-text-webpack-plugin": "^4.0.0-beta.0",
                    "file-loader": "^1.1.11",
                    "html-webpack-plugin": "^3.2.0",
                    "less": "^3.7.1",
                    "less-loader": "^4.1.0",
                    "optimize-css-assets-webpack-plugin": "^5.0.0",
                    "postcss-loader": "^2.1.6",
                    "style-loader": "^0.21.0",
                    "uglifyjs-webpack-plugin": "^1.2.7",
                    "url-loader": "^1.0.1",
                    "vue": "^2.5.16",
                    "vue-loader": "^15.2.4",
                    "vue-router": "^3.0.1",
                    "vue-template-compiler": "^2.5.16",
                    "vuex": "^3.0.1",
                    "webpack": "^4.16.0",
                    "webpack-cli": "^3.0.8",
                    "webpack-dev-server": "^3.1.4"
                  }
            }
            
            return option;
        } 
        
       if(def.react===true) {
        option = {
            "dependencies": {
                "assets-webpack-plugin": "^3.5.1",
                "autoprefixer": "^8.6.5",
                "axios": "^0.18.0",
                "babel-loader": "^7.1.5",
                "babel-plugin-transform-runtime": "^6.23.0",
                "babel-polyfill": "^6.26.0",
                "babel-preset-es2015": "^6.24.1",
                "babel-preset-es2016": "^6.24.1",
                "babel-preset-react": "^6.24.1",
                "babel-preset-stage-2": "^6.24.1",
                "babel-runtime": "^6.26.0",
                "clean-webpack-plugin": "^0.1.17",
                "css-loader": "^1.0.0",
                "cross-env": "^5.2.0",
                "extract-text-webpack-plugin": "^4.0.0-beta.0",
                "file-loader": "^1.1.11",
                "html-react-parser": "^0.4.1",
                "html-webpack-plugin": "^2.30.1",
                "less": "^3.7.1",
                "less-loader": "^4.1.0",
                "optimize-css-assets-webpack-plugin": "^5.0.0",
                "postcss-loader": "^2.0.9",
                "prop-types": "^15.6.0",
                "react": "^15.6.1",
                "react-dom": "^15.6.2",
                "react-id-swiper": "^1.5.7",
                "react-responsive-carousel": "^3.1.30",
                "react-router": "^4.2.0",
                "react-router-dom": "^4.2.2",
                "react-scripts": "1.0.13",
                "react-toast-mobile": "^1.0.7",
                "style-loader": "^0.19.0",
                "uglifyjs-webpack-plugin": "^1.1.2",
                "url-loader": "^0.6.2",
                "webpack": "^4.16.0",
                "webpack-cli": "^3.0.8",
                "webpack-dev-server": "^3.1.4",
                "webpack-parallel-uglify-plugin": "^1.0.2"
              }
        }
        return option;
       }
        
        
    
}