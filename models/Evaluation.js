const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    personId: { type: String, require: true},
    personName: { type: String, require: true},
    pacoteId: { type: String, require: true},
    score: { type: Number, require: true},
    comment: { type: String, require: true},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Evaluation', EvaluationSchema, 'evaluation')