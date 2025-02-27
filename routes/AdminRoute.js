import express from "express";
import { loginAdmin } from "../controllers/AdminController.js";
const AdminRoute = express.Router();

AdminRoute.post("/login", loginAdmin)

export default AdminRoute;