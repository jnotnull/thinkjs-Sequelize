'use strict';
import Sequelize from 'Sequelize';

/**
 * relation model
 */
export default class extends think.base {
    
    /**
     * schema
     * @type {Object}
     */
    schema = {};

    /**
     * model instance
     * @type {[type]}
     */
    _model = null;

    /**
     * constructor
     * @param  {[type]} name   [description]
     * @param  {Object} config [description]
     * @return {[type]}        [description]
     */
    constructor(name, config = {}) {
        super();
        if (think.isObject(name)) {
            config = name;
            name = "";
        }
        this.name = name;
        this.config = think.parseConfig(config);
    }

    /**
     * 创建连接
     * @return {[type]} [description]
     */
    getConnection() {
        let user = "";
        if (this.config.user) {
            user = this.config.user + ":" + this.config.password + "@";
        }
        let host = this.config.host || "127.0.0.1";
        let port = this.config.port || 3306;

        var sequelize = new Sequelize(`mysql://${user}${host}:${port}/${this.config.database}`, {
          define: {
            timestamps: false // true by default
          }
        });

        return sequelize;
    }

    /**
     * 获取 Seqelize 里的 Model
     * @return {[type]} [description]
     */
    getModel() {
        if (!this._model) {
            let connection = this.getConnection();
            this._model = connection.define(this.name, this.schema, {
                freezeTableName: true
            });
        }
        return this._model;
    }
}
