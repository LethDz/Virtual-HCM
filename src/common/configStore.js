import { devStore } from 'src/common/configStore.dev';
import { prodStore } from 'src/common/configStore.prod';
let configStore = null;
let store = null;

if (process.env.NODE_ENV === 'production') {
  configStore = require('src/common/configStore.prod').default;
  store = prodStore;
} else {
  configStore = require('src/common/configStore.dev').default;
  store = devStore;
}

export { store, configStore };
