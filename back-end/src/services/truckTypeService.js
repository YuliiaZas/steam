const {TruckType} = require('../models/truckTypeModel');

const {DataError} = require('../utils/errors');

const addTruckTypeToDB = async (truckTypeInfo) => {
  let truckTypeInDB = await TruckType.findOne({type: truckTypeInfo.type});
  if (!truckTypeInDB) {
    console.log(truckTypeInfo.type, 'is absent');
    truckTypeInDB = new TruckType({...truckTypeInfo});
    try {
      await truckTypeInDB.save();
      console.log(truckTypeInDB);
    } catch (err) {
      throw new DataError('All required fields should be filled out');
    }
  }
};

module.exports = {
  addTruckTypeToDB,
};
