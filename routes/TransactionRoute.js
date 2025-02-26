import express from "express";
import { getAllTransactions, getTransactionById, addTransaction, updateTransaction, deleteTransaction, processTransaction } from "../controllers/TransactionController.js";

const TransactionRoute = express.Router();

TransactionRoute.get("/", getAllTransactions)
TransactionRoute.get("/find/:id", getTransactionById)
TransactionRoute.post("/create", addTransaction)
TransactionRoute.delete("/delete/:id", deleteTransaction)
TransactionRoute.put("/update/:id", updateTransaction)

TransactionRoute.post("/process", processTransaction)

export default TransactionRoute;