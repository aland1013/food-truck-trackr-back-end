const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Trucks = require('./trucks-model');

/* ----- GET /api/trucks ----- */
router.get('/', restricted, (req, res) => {
  Trucks.find()
    .then((trucks) => {
      res.status(200).json(trucks);
    })
    .catch((err) => {
      res, send(err);
    });
});

/* ----- GET /api/trucks/:id ----- */
router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Trucks.findById(id)
    .then((truck) => {
      if (truck) {
        res.status(200).json(truck);
      } else {
        res.status(404).json({ message: 'Could not find truck with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get trucks' });
    });
});

/* ----- POST /api/trucks ----- */
router.post('/', restricted, (req, res) => {
  const truck = req.body;

  Trucks.add(truck)
    .then((truck) => {
      res.status(201).json({ data: truck });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

/* PUT /api/trucks/:id ----- */
router.put('/:id', restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Trucks.findById(id)
    .then((truck) => {
      if (truck) {
        Trucks.update(changes, id).then((updatedTruck) => {
          res.json(updatedTruck);
        });
      } else {
        res.status(404).json({ message: 'Could not find truck with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to update truck' });
    });
});

module.exports = router;
