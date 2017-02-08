'use strict';

const mysql = require('mysql');
// import { DBConfig } from "./DBConfig";
const DBConfig = require('./DBConfig');
const pool = mysql.createPool(DBConfig);


exports.list = () => {
  return new Promise((resolve, reject) => {
    const sql =

      "SELECT re.resume_idx, resume_tag , pp.portfolio_picure_1 "+
      "FROM resume as re " +
      "LEFT JOIN portfolio_picure as pp ON re.resume_idx = pp.resume_idx ";

    pool.query(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


exports.detail_pic = (resume_idx) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT rs.resume_idx, u.user_nickname, pp.portfolio_picure_1, pp.portfolio_picure_2, pp.portfolio_picure_3, pp.portfolio_picure_4, pp.portfolio_picure_5 " +
    "FROM resume as rs " +
    "LEFT JOIN user as u ON rs.user_idx = u.user_idx " +
    "LEFT JOIN portfolio_picure as pp ON rs.resume_idx = pp.resume_idx " +
    "WHERE rs.resume_idx = ? " ;

    pool.query(sql, resume_idx, (err,rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.detail_info = (resume_idx) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT resume_idx, resume_contact, resume_kakaoID, resume_intro, resume_star, resume_email, resume_tag " +
    "FROM resume " +
    "WHERE resume_idx = ? ";

    pool.query(sql, resume_idx, (err,rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });


  });



};

exports.detail_review = (resume_idx) => {
  return new Promise((resolve, reject) => {
    const sql =

      "SELECT rv.review_idx , rv.review_contents, u.user_nickname " +
      "FROM review as rv " +
      "LEFT JOIN user as u ON rv.user_idx = u.user_idx " +
      "WHERE rv.resume_idx= ? ";

    pool.query(sql, resume_idx, (err, rows) => {
      if(err){
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

};



exports.getDataZero = (uuid) => {
  return new Promise((resolve, reject) => {
    const sql =
      "select *from resume  as r left join portfolio_picure as pp on r.resume_idx = pp.resume_idx " +
      "where  r.resume_permission = 0 "+
      "order by rand() limit 1 "
    pool.query(sql, uuid, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

};
exports.getData = (uuid) => {

  return new Promise((resolve, reject) => {
    const sql =
      "select *from userResum as ur left join resume as r on ur.resum_idx  != r.resume_idx  and r.resume_permission =0 " +
      "where ur.user_idx = (select user_idx from user where user_uuid = ?) " +
      "order by rand()"

    pool.query(sql, uuid, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//1.스타카운트를 올리고

//2.스타포인트를 올리고

//3.유저Resume에 내 idx와 해당 resume_idx를 보낸다.

//4.평가한 녀석의 count를새고,

let calculate = function (value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value + 1);
    }, 0);
  });
};


exports.setEvaluate = (uuid,resumIdx,starPoint) => {
  return new Promise((resolve, reject) => {
    console.log('promiss');

    const QUERY_UP_STARCOUNT = "update resume set resume_star_count = resume_star_count + 1 " +
      "where resume_idx = ?";

    const QUERY_UP_STARTPOINT = "update resume "+
      "set resume_star = IF(resume_star = '0', ?,(?+resume_star*(resume_star_count-1))/resume_star_count) " +
      "where resume_idx = ?";
    const QUERY_INSERT_USER_RESUME = "insert into userResum (user_idx,resum_idx) values((select user_idx from user where user_uuid = ?),?)"
    const QUERY_CHECK_PERMISSION = "update resume set resume_permission = IF(resume_star_count > 4 and resume_star >1 ,1,0) "+
      "where resume_idx = ?";

    pool.query(QUERY_UP_STARCOUNT,resumIdx, (err, rows) => {
      console.log('call starcount');
      if (err) {
        reject(err);
      } else {
        pool.query(QUERY_UP_STARTPOINT, [starPoint,starPoint,resumIdx], (err, rows) => {
          console.log('call starpoint');
          if (err) {
            reject(err);
          } else {
            //성공하면
            pool.query(QUERY_INSERT_USER_RESUME, [uuid,resumIdx], (err, rows) => {
              console.log('call userResume');
              if (err) {
                reject(err);
              } else {
                pool.query(QUERY_CHECK_PERMISSION, resumIdx, (err, rows) => {
                  console.log('check');
                  if (err) {
                    reject(err);
                  } else {
                    //성공하면
                    resolve(rows);
                  }
                });
              }
            });


            resolve(rows);
          }
        });
      }
    });
  });
};