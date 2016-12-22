
#ThinkJS的ORM采用Sequelize实现

ThinkJS中内置了ORM，如果你不想使用它，而想换成其它的该怎么做呢？这里就介绍下Sequelize的引入方案。

Sequelize是一款基于Promise的优秀ORM，它提供了主流数据库的支持，包括PostgreSQL, MySQL, MariaDB, SQLite 和 MSSQL。

在引入Sequelize之前，我们先看下Sequelize的建立连接和定义模型的方式：

1. 建立连接

	var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

2. 定义模型

	var User = sequelize.define('user', {
	 	id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true
	    },
	    name2: {
	      type: Sequelize.STRING,
	      field: "name"
	    }
	}, {
	  freezeTableName: true
	});

为了能在controller中方便的通过`this.model("user")`使用模型，我们在model层进行拓展，模型文件中主要包括两个方法getModel和getConnection
	
	/**
     * 创建连接
     * @return {[type]} [description]
     */
    getConnection() {
        let user = "";

        var sequelize = new Sequelize(`mysql://root:xxx@localhost:3306/test`, {
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
            this._model = connection.define('user', {id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true
	    },
	    name2: {
	      type: Sequelize.STRING,
	      field: "name"
	    }}, {
                freezeTableName: true
            });
        }
        return this._model;
    }

因为ThinkJS在调用`this.model('user')`进行实例化模型的时候会自动注入db的config到第二个参数中，所以可以使用构造函数完成db数据的读取

	constructor(name, config = {}) {
        super();
        this.name = name;
        this.config = think.parseConfig(config);
    }

这样`getConnection`就可以变成如下：
	
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

为了其它模型文件也能使用，需要定义一个模型父类base.js，其它模型文件继承该类即可。模型文件负责定义schema，base类负责获得模型对象。完整的user模型文件如下：
	
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

	  /**
	   * init
	   * @param  {} args []
	   * @return {}         []
	   */
	  init(...args){
	    super.init(...args);
	  }
	}

完整的base文件如下：
	
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

现在就可以在controller中调用模型文件了

	async indexAction(){
	    let model = this.model("user");
	    return this.display();
	 }	

剩下要做的就是怎么进行查询新增数据了，只要在模型文件中按照Seqelize的方式写就可以了：
	
	findData(where = {}){
	  let Model = this.getModel();
	  return Model.findOne({ where: where });
	}

	addData(data = {}){
	  let Model = this.getModel();
	  return Model.create(data);
	}

controller中的调用 `var data = await model.findData({id: 1});`