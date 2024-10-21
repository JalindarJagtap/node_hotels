const express = require('express');
const router = express.Router();
const MenuItem = require('./../model/MenuItem');


//get call menu Items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("data get successfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal  server error" });

    }
});

// post method call  menu Item 
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const menuItem = new MenuItem(data);
        const response = await menuItem.save();
        console.log("data saved successfully");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });

    }
});

router.get('/:teastyFood', async (req, res) => {
    try {
        const teastyFood = req.params.teastyFood // 

        if (teastyFood == 'sour' || teastyFood == 'sweet' || teastyFood == 'spicy') {
            const response = await MenuItem.find({ teste: teastyFood });
            console.log("data  fetched ")
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error " })
    }
});
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const menuItem = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, menuItem, {
            new: true,
            runValidators: true
        });
        if (!response) {
            return res.status(404).json({ error: "menu not found" });
        }
        console.log('menu updated');
        res.status(200).json({ message: " menu updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });

    }
});

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: "menu not found" });
        }
        console.log('menu deleted');
        res.status(200).json({ message: "menu deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }

})

module.exports = router;
