import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie";
import {tokenCookieExpires} from '@/settings'

Vue.use(Vuex);

// 自动获取modules下的*.js
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

// vuex持久化
const plugins = [
  createPersistedState({
    key: 'RYAN-ADMIN-INFO',
    storage: window.localStorage,
    reducer(val) {
      return {
        info: val.info
      };
    }
  }),
  createPersistedState({
    key: 'RYAN-ADMIN-SETTINGS',
    storage: window.localStorage,
    reducer(val) {
      return {
        settings: val.settings
      };
    }
  }),
  createPersistedState({
    key: 'RYAN-ADMIN-LAYOUT',
    storage: window.sessionStorage,
    reducer(val) {
      return {
        layout: val.layout
      };
    }
  }),
  createPersistedState({
    key: 'RYAN-ADMIN-TOKEN',
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) =>
          Cookies.set(key, value, {expires: modules.user.state.rememberMe ? tokenCookieExpires : 1, secure: false}),
      removeItem: key => Cookies.remove(key)
    },
    reducer(val) {
      return {
        token: val.token,
      };
    }
  })
];

export default new Vuex.Store({
  modules,
  plugins
})

