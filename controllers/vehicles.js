const mongodb = require('../config/db.config');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('vehiculos').find()
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists);
    })
}

const getSingle = async (req, res, next) => {
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .db()
    .collection('vehiculos')
    .find({ _id: vehicleId });
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    });
};
const createContact = async (req, res) => {
    const vehicle = {
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    price: req.body.price
    };
    const response = await mongodb.getDb().db().collection('vehiculos').insertOne(vehicle);
    if (response.acknowledged) {
    res.status(201).json(response);
    } else {
    res.status(500).json(response.error || 'Some error occurred while creating the vehicle.');
    }
};



module.exports = {
    getAll,
    getSingle,
    createContact
};