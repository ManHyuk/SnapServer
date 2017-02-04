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


exports.detail = (resume_idx) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT rs.resume_idx, rs.resume_contact, rs.resume_kakaoID, rs.resume_intro, rs.resume_tag, " +
      "rs.user_idx, u.user_nickname, pp.portfolio_picure_1, pp.portfolio_picure_2, pp.portfolio_picure_3, pp.portfolio_picure_4, pp.portfolio_picure_5, " +
      "  rv.review_idx, rv.review_contents, cm.comment_idx, cm.comment_contents " +
      "FROM resume as rs " +
      "LEFT JOIN user as u ON rs.user_idx = u.user_idx " +
      "LEFT JOIN portfolio_picure as pp ON rs.resume_idx = pp.resume_idx " +
      "LEFT JOIN review as rv ON rs.resume_idx = rv.resume_idx "+
      "LEFT JOIN comment as cm ON rv.review_idx = cm.review_idx " +
      "WHERE rs.resume_idx = ? ";

    pool.query(sql, resume_idx, (err,rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  });
};






