const router = require('express').Router()
const { models: { User }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    console.log('Request Payload:', req.body); // Log the request payload

    // Create a new user using the request body
    const newUser = await User.create(req.body);

    // Only send the necessary user details in the response
    const { id, username } = newUser;

    res.status(201).json({ id, username });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:userId
router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);

    // Update the user attributes based on the request body
    await user.update(req.body);

    // Only send the necessary user details in the response
    const { id, username } = user;

    res.json({ id, username });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

