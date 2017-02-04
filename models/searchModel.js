'use strict';

const mysql = require('mysql');
// import { DBConfig } from "./DBConfig";
const DBConfig = require('./DBConfig');
const pool = mysql.createPool(DBConfig);


exports.search = (search_data) => {
  return new Promise((resolve, reject) => {


    const sql =
      "SELECT resume_idx, resume_tag FROM resume " +
      "WHERE resume_tag REGEXP ? ";
    pool.query(sql, [search_data], (err, rows)=> {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });

  })
};





