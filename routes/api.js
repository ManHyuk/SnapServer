'use strict';

const snapCtrl = require('../controllers/SnapCtrl');
const reviewCtrl = require('../controllers/ReviewCtrl');
const commentCtrl = require('../controllers/CommentCtrl');
const resumeCtrl = require('../controllers/ResumeCtrl');
const searchCtrl = require('../controllers/SearchCtrl');
const userCtrl = require('../controllers/UserCtrl');




module.exports = (router) => {

  // IMAGE for TEST
  router.route('/image/:img')
    .get(snapCtrl.image);


  // USER
  router.route('/user/register')
    .post(userCtrl.register);
  router.route('/user/login')
    .post(userCtrl.login);



  // SEARCH
  router.route('/search/:search')
    .get(searchCtrl.search);



  // RESUME
  router.route('/resume')
    .get(resumeCtrl.list);
  router.route('/resume/:resume_idx')
    .get(resumeCtrl.detail_pic);
  router.route('/resume/:resume_idx/info')
    .get(resumeCtrl.detail_info);
  router.route('/resume/:resume_idx/review')
    .get(resumeCtrl.detail_review)
    .post(reviewCtrl.write);



  // COMMENT
  router.route('/review/:review_idx/comment')
    .post(commentCtrl.write);



  router.route('/resume/getData')
    .post(resumeCtrl.getData);
  router.route('/resume/evaluate')
    .post(resumeCtrl.evaluate);





  return router;
};
