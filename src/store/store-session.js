import Actions from './store-session-actions';
import Mutations from './store-session-mutations';
import UsersService from './../services/UsersService';
import Config from "../utils/Config";

const Session = {
  state: {
    user: {},
    status: '',
    filters: [],
    variables: []
  },
  mutations: {
    [Mutations.SET_USER](state, user) {
      state.user = { ...state.user, ...user };
    },
    [Mutations.SET_FILTERS](state, filters) {
      state.filters = filters;
    },
    [Mutations.SET_FILTER](state, filter) {
      let i = state.filters.findIndex(item => item.name === filter.name && item.value === filter.value),
        isNew = i === -1;

      if (filter.excludeOther) {
        if (isNew)
          state.filters = [{...filter}];
        else
          state.filters = [];
      } else {
        if (isNew)
          state.filters.push({...filter});
        else
          state.filters.splice(i,1);
      }
    },
    [Mutations.AUTH_ERROR](state, err) {
      state.status = 'error'
    },
    [Mutations.SET_VARIABLE](state, variable) {
      let i = state.variables.findIndex(item => item.name === variable.name),
        isNew = i === -1;

      if (isNew)
        state.variables.push(variable)
      else
        state.variables[i] = variable;
    }
  },
  actions: {
    [Actions.AUTH](context) {
      let service = new UsersService();

      return service.getCurrent().then((user) => {
        context.commit(Mutations.SET_USER, user);
      }).catch((err) => {

        const authURL = Config.data.api.http.authURL + '?redirect=' + encodeURIComponent(window.location.href);

        if (!err.response)
          document.body.innerHTML = err.message;
        else if (err.response.status === 401)
          window.location.href = authURL;
      })
    },
    [Actions.LOGOUT](context, baseURL) {
      //window.location.href = Config.data.api.http.logoutURL
    },
    [Actions.TOGGLE_FILTER](context, filter) {
      context.commit(Mutations.TOGGLE_FILTER, filter);
    },
    [Actions.CLEAR_ALL_FILTERS](context) {
      context.commit(Mutations.SET_FILTERS, []);
    },
    [Actions.SET_VARIABLE](context, payload) {
      context.commit(Mutations.SET_VARIABLE, payload);
    },
  },
  getters: {
    filters: (state) => () => {
      return state.filters.reduce((accum, item) => {
        return {
          ...accum,
          [item.name]: item.values
        }
      }, {})
    },
    variables: (state) => () => {
      return state.variables.reduce((accum, item) => {
        return {
          ...accum,
          [item.name]: item.value
        }
      }, {})
    }
    /*authStatus: state => state.status,
    getFilter: function (name) {
        console.log(arguments, this)
        return state.filters.filter(item => item.name === name).map(item => item.name);
    }*/
  }
}
export default Session;