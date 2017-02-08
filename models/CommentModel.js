'use strict';

const mysql = require('mysql');
// import { DBConfig } from "./DBConfig";
const DBConfig = require('./DBConfig');
const pool = mysql.createPool(DBConfig);


exports.write = (comment_data) => {
  return new Promise((resolve, reject) => {

    console.log("comment_Data ", comment_data);
    const sql =
      "INSERT INTO comment(user_idx, review_idx, comment_contents) " +
      "VALUES (?, ?, ?) ";

    pool.query(sql, [comment_data.user_idx, comment_data.review_idx, comment_data.review_contents], (err, rows)=> {
      if (err){
        reject(err);
      } else {
        // resolve(rows);
        if (rows.affectedRows == 1){ // 담벼락 쓰기 시도
          resolve(rows);
        } else {
          const _err = new Error("Comment Write Error");
          reject(_err);
        }
      }
    })
  })
};
