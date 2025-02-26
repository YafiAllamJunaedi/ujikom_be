import User from "./UserModel.js";
import Shoes from "./ShoesModel.js";
import Transaction from "./TransactionModel.js";
import Admin from "./AdminModel.js";
import db from "../utils/connection.js";

User.hasMany(Transaction, { foreignKey: 'id_user' });
Transaction.belongsTo(User, { foreignKey: 'id_user' });

Shoes.hasMany(Transaction, { foreignKey: 'id_shoes' });
Transaction.belongsTo(Shoes, { foreignKey: 'id_shoes' });

await db.sync({ alter: true });

console.log('All models were synchronized successfully.');