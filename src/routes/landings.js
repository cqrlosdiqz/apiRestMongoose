const route = require('express').Router();
const LandingsModel = require('../models/Landings');

// 1. GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)
// - Ejemplo: `/astronomy/landings?minimum_mass=200000`
route.get('/landings', async (req, res, next) => {
  const { minimum_mass } = req.query;
  if (!minimum_mass) return next();
  try {
    const result = await LandingsModel.find(
      {
        mass: { $gte: minimum_mass },
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

// 2. GET para obtener nombre y masa de uno o más meteoritos cuya masa sea la especificada (route params)
// - Ejemplo: `/astronomy/landings/mass/200000`
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
      'Error al buscar meteoritos cuya masa sea igual a una masa (gr) dada';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

// 3. GET para obtener los nombres y clase de aquellos meteoritos cuya clase sea la registrada (route params)
// - Ejemplo: `/astronomy/landings/class/L6`
route.get('/landings/class/:class', async (req, res, next) => {
  const { class: recclass } = req.params;

  try {
    const result = await LandingsModel.find(
      { recclass },
      { name: 1, recclass: 1, _id: 0 }
    ).lean();
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      'Error al buscarel nombres y clase de aquellos meteoritos cuya clase sea la registrada';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

// 4. GET para obtener nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas de la siguiente manera:
// * `/astronomy/landings?from=1960&to=1990`
// * `/astronomy/landings?from=1960`
// * `/astronomy/landings?to=1990`
// * El mismo endpoint deberá ser compatible con las 3 formas
route.get('/landings', async (req, res, next) => {
  const { from, to } = req.query;
  if (!from && !to) return next();
  try {
    const result = await LandingsModel.find(
      { $or: [{ year: { $gte: from } }, { year: { $lte: to } }] },
      { name: 1, mass: 1, year: 1, _id: 0 }
    ).lean();

    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      'Error al buscar nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

// 5. GET para obtener el nombre de la ciudad, país, región o lo que corresponda a partir del nombre del meteorito
// - Ejemplo: `/astronomy/landings/aachen`
route.get('/landings/:name', async (req, res, next) => {
  const { name } = req.params;
  if (!name) return next();
  try {
    const result = await LandingsModel.findOne(
      { name },
      { name: 1, geolocation: 1, _id: 0 }
    );
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      'Error al buscar el nombre de la ciudad, país, región o lo que corresponda a partir del nombre del meteorito';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

module.exports = route;
