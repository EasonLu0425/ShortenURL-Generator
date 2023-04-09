const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  originalURL:{
    type: String,
    required: true
  },
  shortenURL:{
    type: String,
  }
})

module.exports = mongoose.model('URL',urlSchema)