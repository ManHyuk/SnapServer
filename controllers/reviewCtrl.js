'use strict';

const reviewModel = require('../models/reviewModel');


exports.write = async (req, res, next) => {


  //TODO params check!!!
  // if (!req.params.resume_idx || !req.body.contents){
  //   return res.json({
  //     "status": false,
  //     "message": "Invalid Parameter"
  //   });
  // } else {
    let result ='';

    try {
      const review_data = {
        // user_idx: req.user_idx,
        //TODO user_idx 변경할것
        user_idx: 1,
        resume_idx:req.params.resume_idx,
        review_contents: req.body.contents
      };

      result = await reviewModel.write(review_data);
    }catch (error){
      return next(error);
    }

    return res.json({
      "status":true,
      "message": result
    });
  // }
};

