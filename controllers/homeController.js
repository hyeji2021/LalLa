const Sequelize = require('sequelize');
const mysql = require('mysql2');


//라우팅
const db = require('../models/index.js');
const Hobby = db.Hobby;
const AuctionItem = db.AuctionItem;
const Category = db.Category;

exports.getTopThreeHobbies = async (req, res) => {
  try {
    const topThreeHobbies = await Hobby.findAll({ limit: 3 });
    const AuctionItems = await AuctionItem.findAll({ limit: 5 });
    const Categorys = await Category.findAll();
    res.render("layout", { topThreeHobbies, AuctionItems, Categorys });
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

//auction page
exports.showAuction = async (req, res) => {
try {
    const getAuction = await AuctionItem.findAll();
    res.render("auction", {getAuction: getAuction});
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

//serve page
exports.getServe = async (req, res) => {
    try {
        const categoryNum = req.query.category;
        const serveHobby = await Hobby.findAll({
            where: {
                categoryID: categoryNum,
            },
        });
        res.render("serve", { serveHobby: serveHobby });
    } catch (error) {
        console.error('An error occurred:', error);
        return [];
    }
}

exports.getCagegoryID = async (req, res) => {
        try {
        } catch (error) {
                console.error('An error occurred:', error);
                return [];
        }
}

exports.showHobby = async (req, res) => {
   try {
        console.log("hobby");
        const AllHobbies = await Hobby.findAll();
        res.render("hobby", {AllHobbies: AllHobbies});
   } catch (error) {
   console.error('An error occurred:', error);
    return [];
  }
};

exports.showLogin = (req, res) => {
        console.log("login");
        res.render("login");
};
exports.showSignUp = (req, res) => {
        console.log("signUp");
        res.render("signUp");
};
   
