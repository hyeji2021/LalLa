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
