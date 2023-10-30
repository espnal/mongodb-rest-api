const mongodb = require('../config/db.config');
const passwordUtil = require('../util/passwordComplexityCheck');

const create = async(req, res) => {
  try {
    if (!req.body.username || !req.body.userlastname || !req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const userDb = mongodb.getDb().db().collection('user');
    const username = req.body.username;
    const email = req.body.email;

    const existingUser = await userDb.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already in use' });
    }
    const existingEmail = await userDb.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const newuser = {
      username: req.body.username,
      userlastname: req.body.userlastname,
      email: req.body.email,
      password:req.body.password
      };

    const response = await userDb.insertOne(newuser);

    if (response.acknowledged) {
      res.status(201).json(response);
      } else {
      res.status(500).json(response.error || 'Some error occurred while creating New user.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.userlastname || !req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const userDb = mongodb.getDb().db().collection('user');
    const lastusername = req.params.username;
    const username = req.body.username;
    const email = req.body.email;

    const existingUser = await userDb.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already in use' });
    }
    const existingEmail = await userDb.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const newuser = {
      username: req.body.username,
      userlastname: req.body.userlastname,
      password: req.body.password,
      email: req.body.email,
    }

    const response = await userDb.replaceOne({ username: lastusername }, newuser);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
      } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
      }
  } catch (err) {
    res.status(500).json(err);
  }
};


const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('user').find()
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists);
    })
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async(req, res) => {
  try {
    const username = req.params.username;
    if(!username){
      res.status(400).json('Must use a valid name to get it')
  }
  const result = await mongodb.getDb().db().collection('user').find({ username: username });
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const response = await mongodb.getDb().db().collection('user').deleteOne({ username: username });
    if (response.deletedCount > 0) {
      res.status(204).send();
      } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
      }
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  create,getAll, getUser, updateUser, deleteUser
}