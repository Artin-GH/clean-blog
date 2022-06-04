const postModel = require("../../app/models/post.model");
const mongoose = require("mongoose");

describe("Post model test", () => {
  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost/clean_blog`);
  });

  test("Properly puts 7 posts into database.", async () => {
    for (let i = 1; i <= 7; i++) {
      await postModel.create({
        title: "Test title " + i,
        subtitle: "Test subtitle " + i,
        content: "Test content " + i,
      });
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
