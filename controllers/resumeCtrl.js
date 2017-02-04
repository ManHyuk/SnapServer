'use strict';

const resumeModel = require('../models/resumeModel');
const formidable = require('formidable');
const path = require('path');
// var multiparty = require('multiparty');
// var fs = require('fs');



// 메인
exports.list = async (req, res, next) => {

    let result ='';

    try{
      result = await resumeModel.list();
    }catch (error){
      return next(error);
    }

    return res.json(result);

};

exports.detail = async (req, res, next) => {

  let result = '';

  try{
    result = await resumeModel.detail(req.params.resume_idx);
  }catch (error){
    return next(error)
  }
  return res.json(result);

};

