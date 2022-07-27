import Actions from './store-session-actions';
import Mutations from './store-session-mutations';
import UsersService from './../services/UsersService';
import Config from "../utils/Config";

const Session = {
  state: {
    user: {},
    filters: [],
    variables: []
  },
  mutations: {
    [Mutations.CLEAR_ALL_FILTERS](state, variable) {
      state.filters = []
    },
    [Mutations.SET_USER](state, user) {
      state.user = { ...state.user, ...user };
    },
    [Mutations.SET_FILTER](state, filter) {
      let i = state.filters.findIndex(item => item.name === filter.name),
        isNew = i === -1;

      if (isNew)
        state.filters.push(filter)
      else
        state.filters[i].values = filter.values || [];
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

        const authURL = Config.data.api.http.loginURL + '?redirect=' + encodeURIComponent(window.location.href);

        if (!err.response)
          document.body.innerHTML = err.message;
        else if (err.response.status === 401)
          document.location.href = authURL;
      })
    },
    [Actions.LOGOUT](context, baseURL) {
      //window.location.href = Config.data.api.http.logoutURL
    },
    [Actions.SET_FILTER](context, filter) {
      context.commit(Mutations.SET_FILTER, filter);
    },
    [Actions.CLEAR_ALL_FILTERS](context) {
      context.commit(Mutations.CLEAR_ALL_FILTERS, []);
    },
    [Actions.SET_VARIABLE](context, payload) {
      context.commit(Mutations.SET_VARIABLE, payload);
    },
  },
  getters: {
    filters: (state) => () => {
      return state.filters.reduce((accum, item) => {
        if (!item.values.length)
          return accum;

        return {
          ...accum,
          [item.name]: item.values.map(item => item.qElemNumber).join(',')
        }
      }, {})
    },
    selectedFilterValues: (state) => (name) => {
      let filter = state.filters.find(item => item.name === name);

      return filter ? filter.values : []
    },
    variables: (state) => () => {
      return state.variables.reduce((accum, item) => {
        return {
          ...accum,
          [item.name]: item.value
        }
      }, {})
    },
    selectedVariableValue: (state) => (name) => {
      let variable = state.variables.find(item => item.name === name);

      return variable ? variable.value : null
    },
  }
}
export default Session;