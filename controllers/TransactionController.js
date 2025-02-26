import Transaction from "../models/TransactionModel.js";
import User from "../models/UserModel.js";
import Shoes from "../models/ShoesModel.js";
import "dotenv/config"

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [
                { model: User, attributes: ["name"] },
                { model: Shoes, attributes:  ["name", "image"]}
            ]
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getTransactionById = async (req, res) => {
    const id_transaction = req.params.id;
    try {
        const transaction = await Transaction.findByPk(id_transaction, {
            include: [
                { model: User, attributes: ["name"] },
                { model: Shoes, attributes:  ["name", "image"]}
            ]
        });
        res.json(transaction || { message: "Transaction not found" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const addTransaction = async (req, res) => {
    const { id_user, id_shoes, quantity, total, telephone_number, address, Date } = req.body;
    try {
        const newTransaction = await Transaction.create({
            id_user,
            id_shoes,
            quantity,
            total,
            telephone_number,
            address,
            Date
        });
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error inserting transaction:', error);
        res.status(400).send(error.message);
    }
};

export const updateTransaction = async (req, res) => {
    const id_transaction = req.params.id;
    const { quantity, total, telephone_number, address } = req.body;
    try {
        const result = await Transaction.update(
            { item, total, telephone_number, address },
            { where: { id_transaction } }
        );
        res.json(result[0] ? "Transaction updated" : "Transaction not found");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteTransaction = async (req, res) => {
    const id_transaction = req.params.id;
    try {
        const result = await Transaction.destroy({ where: { id_transaction } });
        res.json(result ? "Transaction deleted" : "Transaction not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const processTransaction = async (req, res) => {
    const { id_user, id_shoes, quantity, total, telephone_number, address, Date } = req.body;
    
    try {
        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }

        if (user.saldo < total) {
            return res.status(400).json({ error: "Saldo tidak cukup" });
        }

        const newTransaction = await Transaction.create({
            id_user,
            id_shoes,
            quantity,
            total,
            telephone_number,
            address,
            Date,
        });

        await User.update(
            { saldo: user.saldo - total },
            { where: { id: id_user } }
        );

        const updatedUser = await User.findByPk(id_user);
        
        res.status(201).json({
            message: "Transaksi berhasil!",
            transaction: newTransaction,
            saldo: updatedUser.saldo,
        });
    } catch (error) {
        console.error("Error saat checkout:", error);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};
