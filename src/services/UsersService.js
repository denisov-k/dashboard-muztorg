import Service from './Service';
import Config from "../utils/Config";

export default class UsersService extends Service {

  static userEntity() {
    return {
      _id: '',
      email: '',
      username: '',
      directory: '',
      password: '',
      isAdmin: false,
      groups: []
    }
  }

  /**
   * Возвращает юзера тек. сессии
   * @return {Promise}    then(data)
   * data ~ @see userEntity()
   */
  getCurrent() {
    return new Promise((resolve) => {
      let user = UsersService.userEntity();
      user.groups = [ 'Все отчёты' ];
      resolve(user);
    });
    let callback = function (response) {

      if (typeof response.data !== 'object')
        document.location.href = Config.data.api.http.loginURL;

      response.data.groups = response.data.groups.map(item => item.name);

      return response.data;
    }

    return this.transport.request(`auth/info`, {}, callback, 'get');
  }

  /**
   * Возвращает список ролей
   * @return {Promise}    then(data)
   */
  getGroupsList() {
    return new Promise((resolve) => {
      resolve(['admin_tech', 'admin_business']);
    })
  }
}