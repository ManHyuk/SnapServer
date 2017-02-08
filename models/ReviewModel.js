'use strict';

const mysql = require('mysql');
// import { DBConfig } from "./DBConfig";
const DBConfig = require('./DBConfig');
const pool = mysql.createPool(DBConfig);




exports.write = (review_data) => {
  return new Promise((resolve, reject) => {



    const sql =
      "INSERT INTO review(user_idx, resume_idx, review_contents) " +
      "VALUES (?, ?, ? ) ";

    console.log(review_data);
    pool.query(sql, [review_data.user_idx, review_data.resume_idx, review_data.review_contents], (err, rows)=> {
      if (err){
        reject(err);
      } else {
        // resolve(rows);
        if (rows.affectedRows == 1){ // 담벼락 쓰기 시도
          resolve(rows);
        } else {
          const _err = new Error("Review Write Error");
          reject(_err);
        }
      }
    })
  })
};
