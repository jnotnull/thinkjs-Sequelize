'use strict';

import base from './base.js';

import Sequelize from 'Sequelize';

/**
 * relation model
 */
export default class extends base {

  schema = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name2: {
      type: Sequelize.STRING,
      field: "name"
    }
  }

  findData(where = {}){
      let Model = this.getModel();
      return Model.findOne({ where: where });
  }
  
  addData(data = {}){
      let Model = this.getModel();
      return Model.create(data);
  }

  /**
   * init
   * @param  {} args []
   * @return {}         []
   */
  init(...args){
    super.init(...args);
  }
}
