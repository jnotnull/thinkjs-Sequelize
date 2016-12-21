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

    return this.display();
  }
}