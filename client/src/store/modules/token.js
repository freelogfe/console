import {OtherService} from '@/services'
import {mutationTypes} from "./user";

const types = {
  CHECK_TOKEN: 'checkToken',
  DELETE_TOKEN: 'deleteToken',
  CREATE_TOKEN: 'createToken'
};

const token = {
  state: {},

  mutations: {},

  actions: {
    [types.CHECK_TOKEN]({commit, getters}) {
      return new Promise((resolve, reject) => {
        if (getters.session.user && getters.session.user.userId) {
          resolve(true)
        } else {
          this.dispatch('getCurrentUser').then((data) => {
            resolve(!!data)
          })
        }
      })
    },
    [types.DELETE_TOKEN]({commit, getters}) {
      commit(mutationTypes.CHANGE_SESSION, {token: null, user: null})
    },
    //去登录
    [types.CREATE_TOKEN]({commit}, data) {
      return this.dispatch('userLogin', data)
    }
  }
}

export default token
