'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * relation model
 */
var _class = function (_think$base) {
    (0, _inherits3.default)(_class, _think$base);

    /**
     * constructor
     * @param  {[type]} name   [description]
     * @param  {Object} config [description]
     * @return {[type]}        [description]
     */

    /**
     * schema
     * @type {Object}
     */
    function _class(name) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck3.default)(this, _class);

        var _this = (0, _possibleConstructorReturn3.default)(this, _think$base.call(this));

        _this.schema = {};
        _this._model = null;

        if (think.isObject(name)) {
            config = name;
            name = "";
        }
        _this.name = name;
        _this.config = think.parseConfig(config);
        return _this;
    }
    /**
     * 创建连接
     * @return {[type]} [description]
     */

    /**
     * model instance
     * @type {[type]}
     */


    _class.prototype.getConnection = function getConnection() {
        var user = "";
        if (this.config.user) {
            user = this.config.user + ":" + this.config.password + "@";
        }
        var host = this.config.host || "127.0.0.1";
        var port = this.config.port || 3306;

        var sequelize = new _Sequelize2.default('mysql://' + user + host + ':' + port + '/' + this.config.database, {
            define: {
                timestamps: false // true by default
            }
        });

        return sequelize;
    };
    /**
     * 获取 Mongoose 里的 Model
     * @return {[type]} [description]
     */


    _class.prototype.getModel = function getModel() {
        if (!this._model) {
            var connection = this.getConnection();
            this._model = connection.define(this.name, this.schema, {
                freezeTableName: true
            });
        }
        return this._model;
    };

    return _class;
}(think.base);

exports.default = _class;
//# sourceMappingURL=base.js.map