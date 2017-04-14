require('babel-register')();
const chai = require('chai');
const { jsdom } = require('jsdom');

const exposedProperties = ['window', 'navigator', 'document'];

// This prevents node/babel from handling style requires like var style = require('./style.scss');
// https://github.com/react-toolbox/react-toolbox/issues/633#issuecomment-235087142
require.extensions['.scss'] = () => {};
require.extensions['.css'] = () => {};

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});


// this has to happen after the globals are setup
// the require flow is: chai-enzyme > enzyme > react > fbjs/lib/ExecutionEnvironment
// so, we need to initialize globals before requiring chai-enzyme
// this allows .unmount() to work
// https://github.com/airbnb/enzyme/issues/395#issuecomment-239352075
chai.use(require('chai-enzyme')());
