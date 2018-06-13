// 旧的浏览器中使用 require.ensure 请记得 去 shim Promise. es6-promise polyfill.
import 'promise-polyfill/src/polyfill';
import './layer/theme/default/layer.css';
require.ensure([], function(require){
    require('./layer/layer.js')
}, 'layer');

//import photos from './photos.json'
import './styles.css';
//var photos = {
//    "title": "",
//    "id": 123,
//    "start": 0,
//    "data": [
//        {
//            "alt": "1",
//            "pid": 1,
//            "src": require('./images/1.png'),
//            "thumb": require('./images/1.png')
//        },
//        {
//            "alt": "2",
//            "pid": 2,
//            "src": require('./images/2.gif'),
//            "thumb": require('./images/2.gif')
//        },
//        {
//            "alt": "3",
//            "pid": 3,
//            "src": require('./images/3.jpg'),
//            "thumb": require('./images/3.jpg')
//        },
//        {
//            "alt": "4",
//            "pid": 4,
//            "src": require('./images/4.jpg'),
//            "thumb": require('./images/4.jpg')
//        },
//        {
//            "alt": "5",
//            "pid": 5,
//            "src": require('./images/5.jpg'),
//            "thumb": require('./images/5.jpg')
//        }
//    ]
//}
function component() {
    var element = document.createElement('div');

     element.innerHTML = _.join(['Hello', 'webpack55555'], ' ');

    return element;
}

document.body.appendChild(component());
//layer.photos({
//    photos: photos
//    ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
//});
layer.open({
    type: 1,
    skin: 'layui-layer-rim', //加上边框
    area: ['420px', '240px'], //宽高
    content: 'html内容'
});
