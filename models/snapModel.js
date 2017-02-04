'use strict';

const mysql = require('mysql');
// import { DBConfig } from "./DBConfig";
const DBConfig = require('./DBConfig');
const pool = mysql.createPool(DBConfig);

/**
 * TODO 조회값 추가
 * Post retrieve
 * @param team_idx
 */
exports.login = (team_idx) => {
  return new Promise((resolve, reject) => {

  });
};