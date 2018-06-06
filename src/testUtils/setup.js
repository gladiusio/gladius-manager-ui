// setup taken from https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint no-console: "off" */

import { JSDOM } from 'jsdom';
import raf from 'raf';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import noop from '../util/noop';

const originalLog = console.log;

function log(stage, msg) {
  if (arguments.length === 1) {
    originalLog(`[SETUP] ${stage}`);
    return;
  }

  originalLog(`[SETUP][${stage}] ${msg}`);
}

log('Starting...');

const jsdom = new JSDOM('<!doctype html><html><body><div id="full-modal"></div></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

window.fetch = noop;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = raf;
global.localStorage = {
  getItem(key) {
    return this[key] || null;
  },
  setItem(key, value) {
    this[key] = value;
  },
};

copyProps(window, global);

log('BABEL', 'Adding Babel polyfill.');

require('babel-polyfill');

log('BABEL', 'Done.');
log('INTEGRITY', 'Installing leaked-timers.');

require('leaked-handles');

log('INTEGRITY', 'Done.');

if (!process.argv.find(arg => (arg === '--no-override-console'))) {
  log('INTEGRITY', 'Overriding console.');
  ['error', 'warn'].forEach((level) => {
    const original = console[level].bind(console);
    console[level] = (...args) => {
      original(...args);
      throw new Error(`Received report from console with level ${level}. Please fix.`);
    };
  });
  log('INTEGRITY', 'Done.');
}

log('ENZYME', 'Configuring.');
Enzyme.configure({ adapter: new Adapter() });
log('ENZYME', 'Done');
log('Done.');
