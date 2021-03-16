import mongoose from "mongoose";
const statListSchema = mongoose.Schema({
  categoryName: String,
  statList: [
    {
      statName: String,
      statId: String,
      emoji: String,
      category: String,
    },
  ],
});

const categoryListSchema = mongoose.Schema({
  userId: String,
  categoryList: [statListSchema],
});

const StatListModel = mongoose.model("StatList", statListSchema, "statLists");

const CategoryListModel = mongoose.model(
  "CategoryList",
  categoryListSchema,
  "categoryLists"
);

export { StatListModel, CategoryListModel };
