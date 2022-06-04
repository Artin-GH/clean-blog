const postModel = require("../models/post.model");
const {formatDate, getPostSearchContext} = require("../../utils/helpers.util");

async function index(req, res, next) {
  await res.render("posts", await getPostSearchContext(postModel, req.query));
}
async function post(req, res, next) {
  const context = {
    post: await postModel.findById(req.params.id),
    formatDate,
  };
  await res.render("post", context);
}

module.exports = {
  index,
  post,
};
