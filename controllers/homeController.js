const Sequelize = require('sequelize');
const mysql = require('mysql2');


//라우팅
const db = require('../models/index.js');
const Hobby = db.Hobby;
const AuctionItem = db.AuctionItem;
const Category = db.Category;

exports.getTopThreeHobbies = async (req, res) => {
  try {
    const topThreeHobbies = await Hobby.findAll({limit: 3});
    const AuctionItems = await AuctionItem.findAll({limit: 5});
    const Categorys = await Category.findAll();
    res.render("layout", {topThreeHobbies: topThreeHobbies, AuctionItems: AuctionItems, Categorys: Categorys});
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

exports.showHobby = (req, res) => { //EJS 페이지를 사용해 응답
        console.log("hobby");
        res.render("hobby", {
                offeredHobby: hobby}); // ./views/hobby.ejs 파일을 찾아서 렌더링
};

exports.showLogin = (req, res) => {
        console.log("login");
        res.render("login");
};
