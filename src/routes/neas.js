const route = require('express').Router();
const LandingsModel = require('../models/Neas');

// 1. GET para obtener la designación y el período anual en base a la clase orbital del asteroide (con query params)
//     - Ejemplo: `/astronomy/neas?class=aten`
route.get('/neas', async (req, res, next) => {
  const { class: orbitClass } = req.query;
  if (!orbitClass) return next();
  const regex = new RegExp(`^${orbitClass}`, 'i');
  try {
    const result = await LandingsModel.find(
      { orbitClass: { $in: regex } },
      { orbitClass: 1, designation: 1, periodYr: 1, _id: 0 }
    ).lean();

    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      'Error al obtener la designación y el período anual en base a la clase orbital del asteroide';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

// 2. GET para obtener designación, fecha y período anual de todos los asteroides que cumplan el filtro de fechas dadas
// * `/astronomy/neas?from=2010&to=2015`
// * `/astronomy/neas?from=2010`
// * `/astronomy/neas?to=2015`
// * En este caso, además, podremos poner la fecha más específica si quisiéramos:
//   - `YYYY-MM-DD`
//   - `YYYY-MM`
//   - `YYYY`
// * El endpoint debe ser compatible con los 3 casos
route.get('/neas', async (req, res, next) => {
  const { class: orbitClass } = req.query;
  if (!orbitClass) return next();
  const regex = new RegExp(`^${orbitClass}`, 'i');
  try {
    const result = await LandingsModel.find(
      { orbitClass: { $in: regex } },
      { orbitClass: 1, designation: 1, periodYr: 1, _id: 0 }
    ).lean();

    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage =
      'Error al obtener la designación y el período anual en base a la clase orbital del asteroide';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

module.exports = route;
