import db from '../utils/connection.js';
import { DataTypes } from 'sequelize';
import User from './UserModel.js'
import Shoes from './ShoesModel.js';

const Transaction = db.define('Transaction', {
  id_transaction: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  id_shoes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Shoes,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  telephone_number: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'transaction',
  timestamps: false
});

export default Transaction