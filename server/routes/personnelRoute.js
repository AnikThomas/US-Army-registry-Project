const express = require("express");
require("dotenv").config();
const api = express.Router();
const path = require("path");

//Model
const PersonModel = require("./../models/personnel");
// const { populate } = require("../models/pageModel");

//list all personnel
api
  .route("/")
  .get((req, res) => {
      PersonModel.find().exec((err, person) =>{
          if(err) return res.status(400).send(err);
          res.status(200).send(person);
      });
  })
  .post((req, res) =>{
      const newPerson = new PersonModel(req.body);
      newPerson.save((err, person) =>
        err ? res.status(400).send(err) : res.status(201).send(person)
      );
  });

  //Just one person
  api
    .route("/:id")
    .get((req, res) =>{
        PersonModel.findOne({ _id: req.params.id }).exec((err, person) =>{
            if (err){
              console.log(err);
              res.status(400).send(err);
            } else if (person){
              res.status(200).send(person);
            }else {
                res.status(404).send("404 --- Person not found");
            }
        });
    })
    .delete((req, res) =>{
        PersonModel.findByIdAndRemove({ _id: req.params.id }).exec((err, person) =>{
            if (err) {
              res.status(400).send(err);
            } else if (person) {
              res.status(204).send();
            } else {
              res.status(404).send("404 --- Person not found");
            } 
        });
    })
    .put((req, res) =>{
        PersonModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
        }).exec((err, person) => {
           if (err) {
             res.status(400).send(err);
           } else if (person) {
             res.status(202).send(person);
           } else {
              res.status(404).send("404 --- Person not found");
           }
        });
    })



module.exports = api;