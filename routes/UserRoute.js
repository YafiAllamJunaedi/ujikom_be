import express from "express";
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, loginUser, registerUser, getUserProfile } from "../controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.get("/", getAllUsers)
UserRoute.get("/find/:id", getUserById)
UserRoute.post("/create", addUser)
UserRoute.delete("/delete/:id", deleteUser)
UserRoute.put("/update/:id", updateUser)

UserRoute.post("/login", loginUser)
UserRoute.post("/register", registerUser)
UserRoute.get('/profile/:id', getUserProfile);

export default UserRoute;