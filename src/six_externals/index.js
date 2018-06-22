// 旧的浏览器中使用 require.ensure 请记得 去 shim Promise. es6-promise polyfill.
import 'promise-polyfill/src/polyfill';
// import jQuery from 'jquery';
//var _ = require('lodash');
//import hzy from 'lodash';
import './layer/theme/default/layer.css';
//require.ensure([], function(require){
//    require('./layer/layer.js')
//    layer.open({
//        type: 1,
//        skin: 'layui-layer-rim', //加上边框
//        area: ['420px', '240px'], //宽高
//        content: 'html内容'
//    });
//}, 'layer');

import './styles.css';
console.log(hzy)
//import './another-module.js'

function component() {
    //console.log($2)
    //console.log(a)
    var element = document.createElement('div');

     element.innerHTML = _.join(['Hello', 'webpack5335'], ' ');

    return element;
}

document.body.appendChild(component());


