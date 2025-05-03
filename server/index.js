import express from "express";
import cors from "cors";
import ApiRoute from "./router/router.js";
import connect from "./dbConfig/dbConfig.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use("/api/auth/", ApiRoute);
connect();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
