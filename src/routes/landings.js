const route = require('express').Router();
const LandingsModel = require('../models/Landings');

route.get('/landings', async (req, res, next) => {
  const { minimum_mass } = req.query;
  try {
    const result = await LandingsModel.find(
      {
        mass: { $gt: minimum_mass },
      },
      { name: 1, mass: 1, _id: 0 }
    ).lean();

    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      'Error al buscar meteoritos cuya masa sea igual o superior a una masa (gr) dada';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

route.get('/landings/mass/:mass', async (req, res, next) => {
  const { mass } = req.params;
  try {
    const result = await LandingsModel.find(
      { mass },
      { name: 1, mass: 1, _id: 0 }
    ).lean();
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      'Error al buscar meteoritos cuya masa sea igual o superior a una masa (gr) dada';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

module.exports = route;
