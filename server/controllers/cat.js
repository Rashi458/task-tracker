const Category = require("../models/cat");
const User = require("../models/user");


// Controller functions
exports.createCategory = async (req, res) => {
    try {
        const {cat,userEmail} = req.body;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Add the new category to the user's categories array
        user.categories.push(cat);
        await user.save();

        const newCategory = new Category({ cat });
        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = exports;
