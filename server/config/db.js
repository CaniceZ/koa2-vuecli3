// db.js
const Sequelize = require('sequelize'); // 引入sequelize
// 引入表结构
const listModel = '../mysql/list.js';
const errorListModel = '../mysql/error.js';
const userModel = '../mysql/user.js';
const signDataModel = '../mysql/signdata.js';
// 使用url连接的形式进行连接
const Todolist = new Sequelize('todolist', 'root', 'a123456', {
	host: '127.0.0.1',
	port: 3306,
	dialect: 'mysql',
	logging: false,
    freezeTableName: true,
    operatorsAliases: false,
	pool:{
	    max:5,
	    min:0,
	    idle:10000
	}
})

const List = Todolist.import(listModel)
const ErrorList = Todolist.import(errorListModel);
const User = Todolist.import(userModel);
const SignData = Todolist.import(signDataModel);
module.exports = {
  List,
  ErrorList,
  User,
  SignData
}
