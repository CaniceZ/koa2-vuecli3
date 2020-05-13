//签到功能
module.exports = function(sequelize, DataTypes){
  return sequelize.define('signdatas', {
    userId: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    days: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    isSignIn: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
  },{
    timestamps: false
  });
}
