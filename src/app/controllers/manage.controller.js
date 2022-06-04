const postModel = require('../models/post.model');
const {formatDate, postRefUrl, getPostSearchContext} = require('../../utils/helpers.util');
const path = require("path");
const { staticFolderPath } = require("../../config/constants");
const fs = require('fs');

function deleteFileIfIsNotDefault(url) {
  let picName = url.split("/");
  picName = picName[picName.length - 1];
  if (picName.split(".")[0] != "default")
    fs.unlink(path.join(staticFolderPath, "media/posts", picName), () => {});
}
async function getBodyFromReq(body, files) {
  if (!files) return body;
  const file = files.picture;
  const fileName = Date.now() + "--" + file.name;
  const filePath = path.join(staticFolderPath, "media/posts", fileName);
  await file.mv(filePath);
  body.pictureUrl = "/media/posts/" + fileName;
  return body
}

async function index(req, res, next) {
  await res.render("manage/index", await getPostSearchContext(postModel, req.query));
}
function addpost(req, res, next) {
  res.render("manage/addpost");
}
async function addpostPost(req, res, next) {
  const body = await getBodyFromReq(req.body, req.files);
  await postModel.create(body);
  await res.redirect("/manage#main");
}
async function del(req, res, next) {
  const post = await postModel.findById(req.params.id);
  deleteFileIfIsNotDefault(post.pictureUrl);
  await post.deleteOne();
  await res.redirect('/manage#main');
}
async function editGet(req, res, next) {
  const context = {
    post: await postModel.findById(req.params.id),
  }
  await res.render('manage/editpost', context);
}
async function editPost(req, res, next) {
  const body = await getBodyFromReq(req.body, req.files);
  const post = await postModel.findById(req.params.id);
  deleteFileIfIsNotDefault(post.pictureUrl);
  if (!body.pictureUrl) {
    body.pictureUrl = '/media/posts/default.jpg';
  }
  await post.updateOne(update = body);
  await res.redirect('/manage#main');
}

module.exports = {
  index, addpost, addpostPost,
  del, editGet, editPost,
}
