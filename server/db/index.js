//this is the access point for all things database related!

const db = require('./db')


const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const CartItem = require('./models/CartItem')
const OrderItem = require('./models/OrderItem')

//associations could go here!


// A single user can have multiple orders, but each order is associated with only one user.
User.hasMany(Order)
Order.belongsTo(User)

// A user can have multiple items in their cart, and each cart item is associated with only one user.
User.hasMany(CartItem)
CartItem.belongsTo(User)

// A single product can be in multiple cart items, and each cart item is associated with only one product.
Product.hasMany(CartItem)
CartItem.belongsTo(Product)

// An order can contain multiple products and a product can be a part of multiple orders. The OrderItem table is the "join table" for this relationship.
Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    CartItem,
    OrderItem,
  },
}
