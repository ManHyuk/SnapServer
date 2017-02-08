'use strict';

const snapModel = require('../models/SnapModel');
const fs = require('fs');

exports.image = (req,res,next) => {
  if(!req.params.img){
    res.json({
      "status":false,
      "message":"invalid parameter"
    });
  }
  else{
    let image = fs.readFileSync('./public/images/measure/' + req.params.img);
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(image, 'binary');
  }

};
