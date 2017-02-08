'use strict';

const userModel = require('../models/UserModel');
const config = require('../config');

exports.register = async(req, res, next) => {

  if(!req.body.id || !req.body.pw || !req.body.nickname ){
    return res.status(400).json({
      "message": "invalid parameter"
    });
  }
  let result = '';
  try {

    const user_data = [req.body.id, config.do_cipher(req.body.pw), req.body.nickname];


    result = await userModel.register(user_data);

  } catch (err) {
    // if (err.status) {
    //   return res.status(err.status).json({
    //     "message": err.message
    //   })
    // } else {
    //   return res.status(500).json({
    //     "message": err
    //   });
    // }

    return next(err)
  }

  return res.json(result)

};


exports.login = async(req, res, next) => {
  if (!req.body.id || !req.body.pw){
    return next(9401)
  } else {
    let result = '';
    try {

      const user_data = [req.body.id, config.do_cipher(req.body.pw)];

      result = await userModel.login(user_data);
    } catch (err) {
      return next(err)
    }

    return res.header('token', result.token).json(result.profile);
  }

};

