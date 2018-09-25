import './styles.css';
import './another-module.js'

function component() {
    var element = document.createElement('div');

     element.innerHTML = _.join(['Hello', 'webpack5335'], ' ');

    return element;
}

document.body.appendChild(component());


