const mongodb = require('../config/db.config');
const passwordUtil = require('../util/passwordComplexityCheck');

const create = async(req, res) => {
  try {
    const newuser = {
      username: req.body.username,
      userlastname: req.body.userlastname,
      email: req.body.email,
      password:req.body.password
      };

    const response = await mongodb.getDb().db().collection('user').insertOne(newuser);
    
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
    if (response.acknowledged) {
      res.status(201).json(response);
      } else {
      res.status(500).json(response.error || 'Some error occurred while creating New user.');
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

const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
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
    const response = await mongodb.getDb().db().collection('user')

      response.findOne({ username: username }, function (err, user) {
      user.username = req.params.username;
      user.userlastname = req.body.userlastname;
      user.password = req.body.password;
      user.email = req.body.email;
      user.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the contact.');
        } else {
          res.status(204).send();
        }
      });
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
    const response = await mongodb.getDb().db().collection('user');
    response.deleteOne({ username: username }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the contact.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  create,getAll, getUser, updateUser, deleteUser
}