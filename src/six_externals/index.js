// 旧的浏览器中使用 require.ensure 请记得 去 shim Promise. es6-promise polyfill.
import 'promise-polyfill/src/polyfill';
// import jQuery from 'jquery';
// import _ from 'lodash';
import './layer/theme/default/layer.css';
require.ensure([], function(require){
    require('./layer/layer.js')
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '240px'], //宽高
        content: 'html内容'
    });
}, 'layer');

import './styles.css';
import './another-module.js'

function component() {
    var element = document.createElement('div');

     element.innerHTML = _.join(['Hello', 'webpack55'], ' ');

    return element;
}

document.body.appendChild(component());


