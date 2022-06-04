const postModel = require('../models/post.model');
const {formatDate, postRefUrl} = require('../../utils/helpers.util');

async function index(req, res, next) {
  const context = {
    posts: await postModel.find({}),
    formatDate,
    postRefUrl,
  };
  res.render('index', context);
}
function about(req, res, next) {
  res.render("about");
}
function contact(req, res, next) {
  res.render("contact");
}
function post(req, res, next) {
  res.render("post");
}
function login(req, res, next) {
  res.render("login");
}
function register(req, res, next) {
  res.render("register");
}

module.exports = {
  index, about, contact,
  post, login, register,
};
