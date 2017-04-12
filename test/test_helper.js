/*eslint-disable*/
// var shallowWithIntl = require('./helpers/intl-enzyme-test-helper').shallowWithIntl;
// var mountWithIntl = require('./helpers/intl-enzyme-test-helper').mountWithIntl;
require('babel-register')();
var chai = require('chai');
// var chaiImmutable = require('chai-immutable');
var jsdom = require('jsdom').jsdom;
const chaiEnzyme = require('chai-enzyme');
var exposedProperties = ['window', 'navigator', 'document'];


require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};
global.document = jsdom('');
global.window = document.defaultView;
// global.shallowWithIntl = shallowWithIntl;
// global.mountWithIntl = mountWithIntl;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// chai.use(chaiImmutable);
chai.use(chaiEnzyme());
