import _ from 'lodash';
import $ from 'jquery';
import foo from './foo.js';


function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
console.log(foo);
console.log(foo());