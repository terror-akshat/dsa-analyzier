// const route = require("express").Router();
import express from "express";
const route = express.Router();
// const { registerUser, Login } = require("../controlles/userControler");
import { registerUser, Login } from "../controlles/userControler.js";

route.post("/register", registerUser);
route.post("/login", Login);

export default route;
