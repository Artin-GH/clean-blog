function formatDate(date) {
  return date.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function postRefUrl(id) {
  return "/posts/post/" + id;
}
async function getPostSearchContext(postModel, query) {
  let searchQueryRegex = query.title || "";
  searchQueryRegex = Array.from(searchQueryRegex)
    .map((chr) => `[${chr.toUpperCase() + chr.toLowerCase()}]`)
    .join("");
  return {
    posts: await postModel.find({ title: { $regex: searchQueryRegex } }),
    formatDate,
    postRefUrl,
    query,
  };
}

module.exports = {
  formatDate, postRefUrl, getPostSearchContext
};
