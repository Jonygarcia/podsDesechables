'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podSchema = new Schema({
    id: Number,
    marca: String,
    precio: String,
    sabor: String
})

const Pod = mongoose.model('Pod', podSchema, 'pod');

module.exports = Pod;