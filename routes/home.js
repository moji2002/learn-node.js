const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get("/me", auth, async (req, res) => {
    try {
      const { firstName, lastName, email } = await User.findById(req.user.id);
      return res.send({ firstName, lastName, email });
    } catch (error) {
      return res.status(400).send({ error, msg: error.message });
    }
  });

router.get('/', (req, res) => {
    res.send('hello world');
});

module.exports = router;