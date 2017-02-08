// userModel.js

'use strict';

const mysql = require('mysql');
const DBConfig = require('./DBConfig');
const pool = mysql.createPool(DBConfig);


const jwt = require('jsonwebtoken');
const config = require('../config');


/**
 *
 * @param user_data = [req.body.id , req.body.pw, req.body.nickname]
 * @returns {Promise}
 */

exports.register = (user_data) => {
  return new Promise((resolve, reject) => {

    const sql =
      "SELECT user_id From user WHERE user_id = ? ";

    pool.query(sql, user_data[0], (err,rows) => {
      if(err){
        reject(err);
      } else {
        // 이미 사용중인 아이디
        if (rows.length != 0) {
          // const err = {
          //   status: 401,
          //   message: "already used id"
          // };
          reject(1201);
        } else {
          resolve(null)
        }
      }
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO user(user_id, user_pw, user_nickname) VALUES (? , ?, ?) "; // 가입
      pool.query(sql, user_data, (err, rows) => {
        if (err) {
          reject(err)
        }else{
          if(rows.affectedRows == 1){
            resolve(rows);
          }else{
            const _err = new Error("User Register Custom error");
            reject(_err);
          }
        }
      })
    }).then((result) => {
        return new Promise((resolve, reject) => {
          const sql =
            "SELECT user_idx, user_id, user_nickname, user_email " +
            "FROM user " +
            "WHERE user_idx = ? ";

          pool.query(sql, result.insertId, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
        })
      })
  });;
};



/***
 *
 * @param user_data = [req.body.id, req.body.pw]
 * @returns {Promise}
 */

exports.login = (user_data) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT user_id FROM user WHERE user_id = ? ";

    pool.query(sql, user_data[0] , (err, rows) => {
      if (err){
        reject(err);
      } else {
        if(rows.affectedRows == 0){ // 아이디 존재 안함
          reject(1202)
        } else {
          resolve(rows)
        }
      }
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT user_id, user_nickname " +
        "FROM user " +
        "WHERE user_id = ? and user_pw = ? ";
      pool.query(sql, user_data, (err, rows) => {
        if(err){
          reject(err)
        } else {
          if (rows.length == 0) {
            reject(1203); // 비번틀림
          } else {
            const profile = {
              id: rows[0].user_id,
              nickname: rows[0].user_nickname
            };

            const token = jwt.sign(profile, config.jwt.cert, {'expiresIn': "10h"});
            const result = { profile, token };
            resolve(result);
          }
        }
      })

    })
  });
};