let configStore = null;

if (process.env.NODE_ENV === 'production') {
  configStore = require('src/common/configStore.prod').default;
} else {
  configStore = require('src/common/configStore.dev').default;
}

export { configStore };
