import _ from 'lodash';
import './styles.css';
import {cube} from './maths.js';
console.log(cube(5)); // 125
function component() {
    var element = document.createElement('div');

     element.innerHTML = _.join(['Hello', 'webpack4444'], ' ');

    return element;
}

document.body.appendChild(component());

//if (module.hot) {
//    module.hot.accept('./index.js', function() {
//        console.log('Accepting the updated printMe module!');
//    })
//}