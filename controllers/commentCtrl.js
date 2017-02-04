'use strict';

const commentModel = require('../models/commentModel');


exports.write = async (req, res, next) => {

  //TODO params check!!!
  // if (!req.body.contents){
  //   return res.json({
  //     "status": false,
  //     "message": "Invalid Parameter"
  //   });
  // }
  // else {

    console.log("review_idx ",req.params.review_idx);
    console.log("contents: ",req.body.contents);
    let result ='';

    try {

      const comment_data = {
        // user_idx: req.user_idx,
        user_idx: 1,
        review_idx: req.params.review_idx,
        comment_contents: req.body.contents
      };

      result = await commentModel.write(comment_data);
    }catch (error){
      return next(error);
    }

    return res.json({
      "status":true,
      "message": result
    });
  // }
};

