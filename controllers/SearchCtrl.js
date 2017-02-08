'use strict';

const searchModel = require('../models/SearchModel');


exports.search = async (req, res, next) => {

  // if (!req.params.resume_idx || !req.body.contents){
  //   return res.json({
  //     "status": false,
  //     "message": "Invalid Parameter"
  //   });
  // } else {

  let result ='';

  try {

    result = await searchModel.search(req.params.search);
  }catch (error){
    return next(error);
  }

  // return res.json({
  //   "status":true,
  //   "message": result
  // });

  return res.json(result);//







  // }
};

