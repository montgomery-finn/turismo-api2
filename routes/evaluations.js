var express = require('express');
var router = express.Router();
const Evaluation = require('../models/Evaluation');
const { default: mongoose } = require('mongoose');

/* GET evaluations listing. */
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }catch(err) {
    return res.status(400).json({ message: 'ID inválido'});
  }

  const evaluation = await  Evaluation.findById(id);
  
  return evaluation ? res.json(evaluation) : res.status(404).json({ message: "ID inexistente"});
});

router.get('/pacoteId/:id', async function(req, res, next) {
  const { id } = req.params;

  const evaluations = await  Evaluation.find({pacoteId: id});

  return res.json(evaluations);
});

router.get('/', async function(req, res) {
  const evaluations = await Evaluation.find(); 

  return res.json(evaluations);
});

router.post('/', async (req, res) => {
  const evaluation = req.body;

  const result = await Evaluation.create(evaluation);

  return res.json(result);
});

router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }catch(err) {
    return res.status(400).json({ message: 'ID inválido'});
  }

  const result = await  Evaluation.deleteOne({ _id: id});
  
  return result.deletedCount > 0 ? res.send() : res.status(404).json({ message: "ID inexistente"});
});

router.put('/:id', async function(req, res) {
  const evaluationJson = req.body;
  const { id } = req.params;

  try{
    new mongoose.Types.ObjectId(id);
  }catch(err) {
    return res.status(400).json({ message: 'ID inválido'});
  }

  const evaluationConfere = await  Evaluation.findById(id);
  
  if(evaluationConfere) {
    evaluationJson.updatedAt = new Date();
    evaluationJson.createdAt = evaluationConfere.createdAt;

    // Fazer a validação dos atributos do objeto
    const hasErrors = new Evaluation(evaluationJson).validateSync();
    if(hasErrors) return res.status(400).json(hasErrors);

    await Evaluation.updateOne({ _id: id}, evaluationJson);
    return res.json(evaluationJson);
  }

  return evaluation ? res.json(evaluation) : res.status(404).json({ message: "ID inexistente"});
});

module.exports = router;
