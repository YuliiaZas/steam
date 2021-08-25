const {Load} = require('../models/loadModel');

const {
  DataError,
  InvalidRequestError,
} = require('../utils/errors');

const {STATES} = require('../utils/consts');

const getLoadsByUserId = async (userId, offset, limit, status) => {
  const loads = status ?
    await Load.find({
      $or: [{created_by: userId}, {assigned_to: userId}],
      status,
    }, {'__v': 0, 'truck': 0, 'logs._id': 0}).skip(+offset).limit(+limit) :
    await Load.find({
      $or: [{created_by: userId}, {assigned_to: userId}],
    }, {'__v': 0, 'truck': 0, 'logs._id': 0}).skip(+offset).limit(+limit);
  return {
    offset,
    limit,
    loads: loads,
  };
};

const createLoad = async (userId, loadInfo) => {
  const load = new Load({...loadInfo, created_by: userId});
  try {
    await load.save();
  } catch (err) {
    throw new DataError(`All required fields should be filled out. ${err}`);
  }
  return load;
};

const changeLoadStatusFromOldToNew = async (_id, oldStatus, newStatus) => {
  const load = await Load.findOneAndUpdate({_id, status: oldStatus},
      {$set: {status: newStatus}}, {new: true, rawResult: true},
  );

  if (!load.lastErrorObject.updatedExisting) {
    throw new DataError(`${_id} load with status ${oldStatus} is absent`);
  }

  await addLogToLoad(_id,
      `Status was changed from ${oldStatus} to ${newStatus}`);
};

const getLoadById = async (loadId) => {
  const load = await Load.findById(loadId)
      .select({'__v': 0, 'logs._id': 0});
  if (!load) {
    throw new DataError(`${_id} load with is absent`);
  }
  return load;
};

const assignDriverToLoad = async (_id, driverId) => {
  const load = await Load.findOneAndUpdate({_id, assigned_to: null},
      {$set: {assigned_to: driverId}}, {new: true, rawResult: true},
  );

  if (!load.lastErrorObject.updatedExisting) {
    throw new DataError(`${_id} load is already assigned`);
  }
  await addLogToLoad(_id, `Load assigned to driver with id ${driverId}`);
};

const setTruckIdToLoad = async (_id, truckId) => {
  await Load.findOneAndUpdate({_id}, {$set: {truck: truckId}});
};

const setLoadState = async (_id, state) => {
  await Load.findOneAndUpdate({_id}, {$set: {state}});
  await addLogToLoad(_id, `Load state was changed to ${state}`);
};

const addLogToLoad = async (loadId, messageText) => {
  await Load.findOneAndUpdate({_id: loadId}, {
    $push: {logs: {message: messageText}},
  });
};

const getActiveLoadInfo = async (userId) => {
  return await Load.findOne({assigned_to: userId, status: 'ASSIGNED'})
      .select({'__v': 0, 'logs._id': 0});
};

const setNextStateForActiveLoad = async (activeLoad) => {
  const {_id, state} = activeLoad;
  const nextState = STATES[STATES.indexOf(state) + 1];
  await setLoadState(_id, nextState);
  if (nextState === STATES[STATES.length - 1]) {
    await changeLoadStatusFromOldToNew(_id, 'ASSIGNED', 'SHIPPED');
  }
  return nextState;
};

const getLoadByIdAndUserId = async (_id, userId) => {
  const load = await Load.find({
    _id,
    $or: [{created_by: userId}, {assigned_to: userId}],
  }, {'__v': 0, 'truck': 0, 'logs._id': 0});
  return load;
};

const changeLoadInfo = async (_id, userId, loadInfo) => {
  const load = await Load.findOneAndUpdate({_id, created_by: userId},
      {$set: loadInfo}, {new: true, rawResult: true},
      (err, doc) => {
        if (err) {
          throw new InvalidRequestError(`Invalid request: ${err}`);
        }
      });

  if (!load.lastErrorObject.updatedExisting) {
    throw new DataError(`${_id} load is not created by this shipper`);
  }
};

const deleteLoad = async (_id, userId) => {
  await Load.findOneAndRemove({_id, created_by: userId});
};

module.exports = {
  getLoadsByUserId,
  createLoad,
  changeLoadStatusFromOldToNew,
  getLoadById,
  assignDriverToLoad,
  setTruckIdToLoad,
  setLoadState,
  addLogToLoad,

  getActiveLoadInfo,
  setNextStateForActiveLoad,
  getLoadByIdAndUserId,

  changeLoadInfo,
  deleteLoad,
};
