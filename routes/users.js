var express = require('express');
var router = express.Router();
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }catch(err) {
    return res.status(400).json({ message: 'ID inválido'});
  }

  const user = await  User.findById(id);
  
  return user ? res.json(user) : res.status(404).json({ message: "ID inexistente"});
});

router.get('/', async function(req, res) {
  const users = await User.find(); 

  return res.json(users);
});

router.post('/', async (req, res) => {
  const user = req.body;

  const result = await User.create(user);

  return res.json(result);
});

router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }catch(err) {
    return res.status(400).json({ message: 'ID inválido'});
  }

  const result = await  User.deleteOne({ _id: id});
  
  return result.deletedCount > 0 ? res.send() : res.status(404).json({ message: "ID inexistente"});
});

router.put('/:id', async function(req, res) {
  const userJson = req.body;
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }catch(err) {
    return res.status(400).json({ message: 'ID inválido'});
  }

  const userConfere = await  User.findById(id);
  
  if(userConfere) {
    userJson.updatedAt = new Date();
    userJson.createdAt = userConfere.createdAt;

    // Fazer a validação dos atributos do objeto
    const hasErrors = new User(userJson).validateSync();
    if(hasErrors) return res.status(400).json(hasErrors);

    await User.updateOne({ _id: id}, userJson);
    return res.json(userJson);
  }

  return user ? res.json(user) : res.status(404).json({ message: "ID inexistente"});
});

module.exports = router;
