import express from "express";
import cors from "cors";
import mongosse from "mongoose";
import listEndpoints from "express-list-endpoints";
import memoryRouter from "./memories/router.js";
import bodyParser from "body-parser";
import userRouter from "./user/user.js";
import commentRouter from "./comment/comment.js";

// ==================================
const server = express();
const port = process.env.PORT || 5000;
// ====================================
server.use(cors());
server.use(bodyParser.json({ limit: "30mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
server.use(express.json());

// =====================================
server.use("/memory", memoryRouter);
server.use("/usermemory", userRouter);
server.use("/comment", commentRouter);
// =====================================
mongosse.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongosse.connection.on("connected", () => {
  console.log("mongo is connected");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`server connected on port ${port}`);
  });
});
