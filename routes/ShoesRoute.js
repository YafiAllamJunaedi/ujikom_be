import express from "express";
import { getAllShoes, getShoesById, addShoes, updateShoes, deleteShoes } from "../controllers/ShoesController.js";

const ShoesRoute = express.Router();

ShoesRoute.get("/", getAllShoes)
ShoesRoute.get("/find/:id", getShoesById)
ShoesRoute.post("/create", addShoes)
ShoesRoute.delete("/delete/:id", deleteShoes)
ShoesRoute.put("/update/:id", updateShoes)

export default ShoesRoute;