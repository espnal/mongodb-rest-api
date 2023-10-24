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
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid contact id to get the contact')
    }
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
const createVehicle = async (req, res) => {
    const vehicle = {
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    type:req.body.type,
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
const updateVehicle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid contact id to update a contact')
    }
    const vehicleId = new ObjectId(req.params.id);
    const vehicle = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        type:req.body.type,
        color: req.body.color,
        price: req.body.price
        };
    const response = await mongodb
    .getDb()
    .db()
    .collection('vehiculos')
    .replaceOne({ _id: vehicleId }, vehicle);
    console.log(response);
    if (response.modifiedCount > 0) {
    res.status(204).send();
    } else {
    res.status(500).json(response.error || 'Some error occurred while updating the vehicle.');
    }
};

const deleteVehicle = async (req, res) => {
        if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid contact id to delete a contact')
    }
    const vehicleId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('vehiculos').deleteOne({ _id: vehicleId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
    res.status(204).send();
    } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};



module.exports = {
    getAll,
    getSingle,
    createVehicle,
    updateVehicle,
    deleteVehicle
};