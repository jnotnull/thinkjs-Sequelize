'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base2 = require('./base.js');

var _base3 = _interopRequireDefault(_base2);

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * relation model
 */
var _class = function (_base) {
  (0, _inherits3.default)(_class, _base);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _base.call.apply(_base, [this].concat(args))), _this), _this.schema = {
      id: {
        type: _Sequelize2.default.INTEGER,
        primaryKey: true
      },
      name2: {
        type: _Sequelize2.default.STRING,
        field: "name"
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.findData = function findData() {
    var where = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var Model = this.getModel('user');
    return Model.findOne({ where: where });
  };

  _class.prototype.addData = function addData() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var Model = this.getModel();
    return Model.create(data);
  };

  /**
   * init
   * @param  {} args []
   * @return {}         []
   */


  _class.prototype.init = function init() {
    var _base$prototype$init;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    (_base$prototype$init = _base.prototype.init).call.apply(_base$prototype$init, [this].concat(args));
  };

  return _class;
}(_base3.default);

exports.default = _class;
//# sourceMappingURL=user.js.map