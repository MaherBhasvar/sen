var express = require('express');
var Lookup = require('../models').LookupData;
var LookupType = require('../models').LookupType;
var router = express.Router();

router.get('/', function(req, res){
    res.status(400).json({"message": "Id of project is not present in request"});
});

router.get('/:id',function(req, res){
    Lookup.findAll({
        where: {
          id: req.params.id
        },
        include: [{
            model: LookupType
        }]
      })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});
module.exports = router;