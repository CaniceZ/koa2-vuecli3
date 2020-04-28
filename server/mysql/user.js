//用户相关
module.exports = function(sequelize, DataTypes){
  return sequelize.define('user', {
    username: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    password: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
  },{
    timestamps: false
  });
}
