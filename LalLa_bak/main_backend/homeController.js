const db = require('../models/index.js');
const Hobby = db.Hobby;
const AuctionItem = db.AuctionItem;
const Category = db.Category;

exports.getTopThreeHobbies = async (req, res) => {
  try {
    const topThreeHobbies = await Hobby.findAll({limit:3});
    const AuctionItems = await AuctionItem.findAll();
    const Categorys = await Category.findAll();
    res.render("layout", {topThreeHobbies: topThreeHobbies, AuctionItems: AuctionItems, Categorys: Categorys});
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};
