const express = require('express');
const router = new express.Router();

require('dotenv').config({path: './.env'});
const LIMIT = process.env.LIMIT;
const LIMIT_MAX = process.env.LIMIT_MAX;

const {
  getLoadsByUserId,
  getActiveLoadInfo,
  setNextStateForActiveLoad,
  getLoadByIdAndUserId,

  changeLoadInfo,
  deleteLoad,
} = require('../services/loadsService');

const {tryCatchWrapper} = require('../utils/apiUtils');

const {
  isUserShipper,
  isUserDriver,
} = require('../middlewares/roleMiddleware');

const {
  addLoadtoShipper,
  postLoad,
  findTruckForLoad,
  doesLoadHaveStatusNew,
} = require('../middlewares/loadsMiddlewares');

const {setStatusToTruck} = require('../services/trucksService');

const {loadValidator} = require('../middlewares/validationMidlleware');

const {
  DataError,
  InvalidRequestError,
} = require('../utils/errors');

const {STATES} = require('../utils/consts');

router.get('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  let {limit = LIMIT, offset = 0, status} = req.query;
  if (limit > LIMIT_MAX) {
    limit = LIMIT_MAX;
  }
  const loadsInfo = await getLoadsByUserId(userId, offset, limit, status);
  if (!loadsInfo) {
    throw new InvalidRequestError(`Invalid request`);
  }
  res.json(loadsInfo);
}));

router.post('/', isUserShipper, loadValidator, addLoadtoShipper);
// , postLoad, findTruckForLoad);
router.post('/:id/post', isUserShipper, postLoad, findTruckForLoad);

router.get('/active', isUserDriver, tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const activeLoadInfo = await getActiveLoadInfo(userId);
  if (!activeLoadInfo) {
    throw new DataError('Active load was not found');
  }
  res.json({load: activeLoadInfo});
}));

router.patch('/active/state', isUserDriver,
    tryCatchWrapper(async (req, res) => {
      const {userId} = req.user;
      const activeLoad = await getActiveLoadInfo(userId);
      const truckId = activeLoad.truck;

      const nextState = await setNextStateForActiveLoad(activeLoad);
      if (nextState === STATES[STATES.length - 1]) {
        await setStatusToTruck(truckId, 'IS');
      }
      res.json({message: `Load state changed to "${nextState}"`});
    }),
);

router.get('/:id', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const loadId = req.params.id;
  const load = getLoadByIdAndUserId(loadId, userId);
  if (!load) {
    throw new DataError(`${loadId} load was not found`);
  }
  res.json({load});
}));

router.put('/:id', isUserShipper, doesLoadHaveStatusNew, loadValidator,
    tryCatchWrapper(async (req, res) => {
      const {userId} = req.user;
      const loadId = req.params.id;
      const loadInfo = req.body;
      await changeLoadInfo(loadId, userId, loadInfo);
      res.json({message: 'Load details changed successfully'});
    }),
);

router.delete('/:id', isUserShipper, doesLoadHaveStatusNew,
    tryCatchWrapper(async (req, res) => {
      const {userId} = req.user;
      const loadId = req.params.id;
      await deleteLoad(loadId, userId);
      res.json({message: 'Load deleted successfully'});
    }),
);

router.get('/:id/shipping_info', isUserShipper,
    tryCatchWrapper(async (req, res) => {
      const loadId = req.params.id;
      const load = await getLoadByIdAndUserId(loadId, userId);
      if (!load) {
        throw new DataError(`${loadId} load was not found`);
      }
      res.json({load});
      const {truck: truckId, assigned_to: driverId} = load;
      const truck = await getTruckById(truckId, driverId);
      res.json({load, truck});
    }),
);

module.exports = {
  loadsRouther: router,
};
