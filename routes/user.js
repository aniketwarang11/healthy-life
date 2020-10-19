const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
let User = require('../models/user.model');

// router.route('/').get((req, res) => {
//     User.find()
//         .then(user => res.json(user))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        fname: user.fname,
        id: user._id,
    })
})

router.post('/add', async (req, res) => {
    // const fname = req.body.fname;
    // const lname = req.body.lname;
    // const emailid = req.body.emailid;
    // const password = req.body.password;
    // const address = req.body.address;
    try {
        let { fname, lname, emailid, password, confirmPassword, address } = req.body;

        if (!fname || !lname || !emailid || !password || !address) {
            return res.status(400).json({ msg: "Not all fields have been entered." })
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "The password needs to be at least 5 characters." })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Enter the same password twice for verification." })
        }
        const existingUser = await User.findOne({ emailid: emailid });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists." })
        }
        if (!fname) {
            fname = emailid;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ fname, lname, emailid, password: passwordHash, confirmPassword, address });

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { emailid, password } = req.body;

        if (!emailid || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered." })
        }

        const user = await User.findOne({ emailid: emailid })
        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({ msg: "Invalid credentials." })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                fname: user.fname,
            }
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.user);
        res.json(deleteUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router;