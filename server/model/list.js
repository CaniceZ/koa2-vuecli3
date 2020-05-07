// models/user.js
const db = require('../config/db.js')
const List = db.List
const User = db.User
//List.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
List.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id',as: 'userInfo'})
List.belongsTo(User, {foreignKey: 'updaterId', targetKey: 'id',as: 'updater'})
const getUserById = async function(id){
	const userInfo = await List.findOne({
		where: {
			id: id
		}
	});
	return userInfo // 返回数据
}

//返回列表页数
const pageList = async function(params) {
	//pageSize 每页10条数据 page 页数
	let {pageSize, page} = params;

	const list = await List.sync().then(()=>List.findAndCountAll({
			limit: pageSize*1,
			offset: pageSize*(page - 1),
      order: [['updatedAt', 'DESC']],
      include: [{
			  attributes:["username"],
        model: User,
        as: 'userInfo'
      },
        {
          attributes:["username"],
          model: User,
          as: 'updater'
        }]
	}))
	return list
}


//返回列表
const getList = async function(){
	const list = await List.findAll();
	return list
}

//删除一条
const removeList = async function(data){
	const result = await List.destroy({
		where: {
			id: data.id,
			user_id: data.userId
		}
	})
	return true
}

//创建一条
const addList = async function(data){
	const result = await List.create({
		user_id: data.user_id,
		content: data.content,
		status:1,
    updaterId: data.user_id,
	})
	return true
}

//更新一条
const updateList = async function(data){
	const result = await List.update(
		{
		  content:data.content,
      updaterId: data.updaterId
		},
		{
		  where: {
		    id: data.id
		  }
		}
	)
	return true
}

module.exports = {
  getList,
  removeList,
  addList,
	updateList,
	pageList
}
