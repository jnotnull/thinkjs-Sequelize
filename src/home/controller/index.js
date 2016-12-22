'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let model = this.model("user");

    var data = await model.findData({id: 1});

    console.log(data);

    // var newUser = await model.addData({id:2, name2: 'jiyanliang2'});

    // console.log(newUser);

    return this.display();
  }
}