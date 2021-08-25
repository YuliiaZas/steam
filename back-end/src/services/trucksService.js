const {Truck} = require('../models/truckModel');
const {TruckType} = require('../models/truckTypeModel');

const {
  DataError,
  InvalidRequestError,
} = require('../utils/errors');

const getAllTrucksByDriverId = async (userId) => {
  return await Truck.find({created_by: userId}, {__v: 0});
};

const addTruckByDriverId = async (type, userId) => {
  const truck = new Truck({type, created_by: userId});
  try {
    await truck.save();
  } catch (err) {
    throw new DataError(`${err}`);
  }
};

const getAppropriateTruckTypes = async (loadInfo) => {
  const {dimensions: {width, length, height}, payload} = loadInfo;
  let truckTypes = await TruckType.find({
    'dimensions.width': {$gte: width},
    'dimensions.length': {$gte: length},
    'dimensions.height': {$gte: height},
    'payload': {$gte: payload},
  }, {type: 1, _id: 0});
  truckTypes = truckTypes.map((truckType) => truckType.type);
  return truckTypes;
};

const findTruckWithGivenTruckTypes = async (appropriateTruckTypes) => {
  const truck = await Truck.findOne({
    assigned_to: {$not: {$eq: null}},
    status: 'IS',
    type: {$in: appropriateTruckTypes},
  });
  return truck;
};

const setStatusToTruck = async (_id, status) => {
  await Truck.findOneAndUpdate({_id}, {$set: {status}});
};

const getTruckById = async (_id, userId) => {
  return await Truck.findOne({_id, created_by: userId}, {__v: 0});
};

const assignTruckToDriver = async (_id, userId) => {
  const trucks = await getAllTrucksByDriverId(userId);
  if (trucks.findIndex((curTruck) => curTruck.assigned_to) > -1) {
    throw new DataError(`You have assigned truck. 
    Please, reassigne it before assigning another truck`);
  }

  const truck = await Truck.findOneAndUpdate({
    _id,
    created_by: userId,
    assigned_to: null,
  }, {$set: {assigned_to: userId}}, {new: true, rawResult: true});

  if (!truck.lastErrorObject.updatedExisting) {
    throw new DataError(`${_id} truck is assigned or was not created by you`);
  }
};

const doesTruckHaveStatusIS = async (_id) => {
  const truck = await Truck.findOne({_id, status: 'IS'});
  if (!truck) {
    throw new DataError(`${_id} truck with status 'IS' is absent`);
  }
  return true;
};

const reassignTruckToDriver = async (_id, userId) => {
  const truck = await Truck.findOneAndUpdate({_id, assigned_to: userId},
      {$set: {assigned_to: null}}, {new: true, rawResult: true});

  if (!truck.lastErrorObject.updatedExisting) {
    throw new DataError(`${_id} truck is not assigned to this driver`);
  }
  return `${_id} truck is reassigned from driver with id ${userId}`;
};

const isTruckNotAssigned = async (_id) => {
  const truck = await Truck.findOne({_id, assigned_to: null});
  if (!truck) {
    throw new DataError(`${_id} truck is assigned`);
  }
  return true;
};

const changeTruckInfo = async (_id, userId, type) => {
  const truck = await Truck.findOneAndUpdate({_id, created_by: userId},
      {$set: {type}}, {new: true, rawResult: true},
      (err, doc) => {
        if (err) {
          throw new InvalidRequestError(`Invalid request: ${err}`);
        }
      });

  if (!truck.lastErrorObject.updatedExisting) {
    throw new DataError(`${_id} truck is not created by this driver`);
  }
};

const deleteTruck = async (_id, userId) => {
  await Truck.findOneAndRemove({_id, created_by: userId});
};

module.exports = {
  getAllTrucksByDriverId,
  addTruckByDriverId,

  getAppropriateTruckTypes,
  findTruckWithGivenTruckTypes,
  setStatusToTruck,

  getTruckById,
  assignTruckToDriver,
  doesTruckHaveStatusIS,
  reassignTruckToDriver,
  isTruckNotAssigned,
  changeTruckInfo,
  deleteTruck,
};
