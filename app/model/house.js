'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const House = app.model.define('house', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
    info: STRING(150),
    addres: STRING(300),
    priceL: INTEGER,
    publicTime: DATE,
    cityCode: STRING,
    showCount: INTEGER,
    startDate: DATE,
    endTime: DATE,
  });
  // 一个房子对应多个图片 hasMany
  House.assoiate = () => [
    app.model.House.hasMany(app.model.Imgs, {
      foreignKey: 'houseid',
    }),
  ];
  return House;
};
