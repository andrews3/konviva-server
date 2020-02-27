const mongoose = require("mongoose");

const Curso = new mongoose.Schema({
    title: {type: String},
    img: {type: String},
    date: {type: String},
    aulas: {type: Array, default: []}
});

module.exports = mongoose.model("Curso", Curso);