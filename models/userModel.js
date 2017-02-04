// userModel.js

'use strict';

const mysql = require('mysql');
const DBConfig = require('./DBConfig');
const pool = mysql.createPool(DBConfig);

/**
 * TODO 조회값 추가
 * Post retrieve
 * @param team_idx
 */
exports.singUp = (uuid,nickName) => {
        return new Promise((resolve, reject) => {
                const sql =
                  "INSERT INTO user " +
                  "(user_uuid,user_nickname,user_create_time)" +
                  "values(?,?,now())" ;
                pool.query(sql,[uuid,nickName], (err, rows) => {
                  if (err) {
                    reject(err);
                  } else {
                  	// console.log(rows)
                    resolve(rows);
                  }
                });
        });
};
