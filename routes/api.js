'use strict';

const snapCtrl = require('../controllers/snapCtrl');
const reviewCtrl = require('../controllers/reviewCtrl');
const commentCtrl = require('../controllers/commentCtrl');
const resumeCtrl = require('../controllers/resumeCtrl');
const searchCtrl = require('../controllers/searchCtrl');



module.exports = (router) => {

  // USER
  router.route('/user/register')
    .get(snapCtrl.login);


  // SEARCH
  router.route('/search/:search')
    .get(searchCtrl.search);

  // IMAGE

  // RESUME
  router.route('/resume')
    .get(resumeCtrl.list);
  router.route('/resume/:resume_idx')
    .get(resumeCtrl.detail);



  // REVIEW
  router.route('/resume/:resume_idx/review')
    .post(reviewCtrl.write);



  // COMMENT
  router.route('/review/:review_idx/comment')
    .post(commentCtrl.write);





  return router;
};
