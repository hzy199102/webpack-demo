//import 'babel-polyfill';
var getComponent = async function () {
    var element = document.createElement('div');
    //const _ = await import(/* webpackChunkName: "lodash" */'lodash');
    const _ = await import(/* webpackChunkName: "lodash" */'lodash');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
    //return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    //      var element = document.createElement('div');
    //
    //          element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    //
    //          return element;
    //
    //        }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
    document.body.appendChild(component);
})