'use strict';

const resumeModel = require('../models/ResumeModel');




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


// resume PIC
exports.detail_pic = async (req, res, next) => {

  let result = '';

  try{
    result = await resumeModel.detail_pic(req.params.resume_idx);
  }catch (error){
    return next(error)
  }
  return res.json(result);

};


// resume INFO
exports.detail_info = async (req, res, next) => {

  let result = '';

  try{
    result = await resumeModel.detail_info(req.params.resume_idx);
  }catch (error){
    return next(error)
  }
  return res.json(result);

};


// resume REVIEW
exports.detail_review = async (req, res, next) => {



    let result = '';

    try {
      result = await resumeModel.detail_review(req.params.resume_idx);
    } catch (error) {
      return next(error)
    }
    return res.json(result);
};



// resumCtrl.js

//user
//useridx ==5  tester01
//useridx ==6  tester02
//useridx ==7  tester03
//resuem
//useridx ==5 resumIdx ==1
//useridx ==6 resumIdx ==6다

//userResum
//6인친구가 5인 친구를 평가했다.
//join_idx ==1 useridx ==6 resum_idx ==5


exports.getData = async (req, res, next) => {
  console.log('signUp')
  var uuid = req.body.uuid;
  console.log('uuid==> ' + uuid)
  try{
    let result = '';
    result = await resumModel.getData(uuid);
    if(result.length ==0){
      console.log('최초인상태이다 => getData Zero 인상태')
      result = await resumModel.getDataZero(uuid);

    }else{
      console.log('한번이라도 해봤던 경우다. 리절트 값 그대로 아래로 내려가면 된다')
    }

    return res.json({
      "status":true,
      "message":result
    })

  }catch(err){
    return res.json({
      "status":false,
      "message":err
    })

  }
};

//user_idx로 사진을 url에 접속하고,
//resume_idx로 유저의 별점을 전송한다.
exports.evaluate = async (req, res, next) => {

  const starPoint = req.body.starPoint;
  const resumeIdx = req.body.resumeIdx;
  const uuid = req.body.uuid;

  try{
    let result = '';
    result = await resumModel.setEvaluate(uuid,resumeIdx,starPoint);

    return res.json({
      "status":true,
      "message":result
    })

  }catch(err){
    return res.json({
      "status":false,
      "message":err
    })

  }
};

