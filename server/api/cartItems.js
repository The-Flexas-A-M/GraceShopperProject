const router = require("express").Router();
const {
  models: { CartItem, User, Product },
} = require("../db");

// Route to serve CartItems
router.get("/:userId", async (req, res, next) => {
  console.log("Endpoint /api/cartItems/:userId hit"); // test
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (user) {
      const cartItems = await CartItem.findAll({
        where: { userId: userId },
        include: {
          model: Product,
        },
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
router.post("/:userId", async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    let cartItem = await CartItem.findOne({
      where: {
        productId: productId,
        userId: userId,
      },
    });

    if (cartItem) {
      // If the item already exists, increment the quantity
      cartItem.quantity += 1;
    } else {
      // If the item doesn't exist, create a new cart item
      cartItem = await CartItem.create({
        productId: productId,
        userId: userId,
        quantity: 1,
      });
    }

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId/:productId", async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    let cartItem = await CartItem.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (cartItem) {
      cartItem.quantity = quantity;

      if (cartItem.quantity <= 0) {
        // If quantity is less than or equal to 0, remove the item from the cart
        await cartItem.destroy();
      } else {
        await cartItem.save();
      }

      res.json(cartItem);
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
