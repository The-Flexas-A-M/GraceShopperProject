const router = require("express").Router();
const { RequestQuoteRounded } = require("@mui/icons-material");
const {
  models: { CartItem, User, Product },
} = require("../db");

// Route to serve CartItems
router.get("/:userId", async (req, res, next) => {
  console.log("Endpoint /cartItems/:userId hit"); // test 
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (user) {
      const cartItems = await CartItem.findAll({ 
        where: { userId: userId },
        include: {
          model: Product
        } 
      });
      res.status(200).json(cartItems);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

// Route to delete cartItems
router.delete("/:userId/:productId", async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const deletedCount = await CartItem.destroy({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    if (deletedCount > 0) {
      res.status(204).send("items deleted");
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    next(error);
  }
});
router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body

    const item = await CartItem.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });
    if (item) {
      item.quantity -= quantity;

      if (item.quantity <= 0) {
        await item.destroy();
      } else {
        await item.save();
      }

      res.status(200).send('item updated');
    } else {
      res.status(404).send('item not found');
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;
