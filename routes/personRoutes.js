const express = require('express');
const router = express.Router();
const Person = require('./../model/Person');
const { jwtAuthMeddleware, generateToken } = require('./../jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username,
            email: response.email,

        }
        const token = generateToken(payload);
        console.log(token)
        console.log('token saved:', token);

        res.status(200).json({ response: response, token: token });


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });

    }

});
// login Route

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Person.findOne({ username: username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'invalid password or username' });
        }
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        }
        const token = generateToken(payload);
        res.json(token)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });

    }

});
router.get('/profile', jwtAuthMeddleware, async (req, res) => {

    try {
        const userData = req.user;
        console.log("User Data",userData);
        const userId = userData.id;
        const user = await Person.findById(userId)
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal serever  error" });

    }

});

// Get method  to get the person 
router.get('/', jwtAuthMeddleware, async (req, res) => {

    try {
        const data = await Person.find();
        console.log("data fetch success");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: " internal server error" });

    }
});

// person add the params
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType // extract the work type from the params
        if (workType == 'chef' || workType == 'managers' || workType == 'waiters') {
            const response = await Person.find({ work: workType });
            console.log("data fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "invalid  work type" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error " });

    }

});

router.put('/:id', async (req, res) => {
    try {

        const personId = req.params.id;
        const personData = req.body;
        const response = await Person.findByIdAndUpdate(personId, personData, {
            new: true,
            runValidators: true,

        });
        if (!response) {
            return res.status(404).json({ error: 'person is not found' });
        }
        console.log('data is updated  successfully');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })


    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "person not found" });
        }
        console.log(" data deleted");
        res.status(200).json({ message: "person  deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})

module.exports = router;