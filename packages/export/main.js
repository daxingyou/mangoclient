'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'export' () {
      // open entry panel registered in package.json
      Editor.Panel.open('export');
    },
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('export');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('export', 'export:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    }
  },
};