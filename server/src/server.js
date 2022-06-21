import express from "express";
import cors from "cors";
import mongosse from "mongoose";
import listEndpoints from "express-list-endpoints";
import memoryRouter from "./memories/router.js";
import bodyParser from "body-parser";
// ==================================
const server = express();
const port = process.env.PORT || 5000;
// ====================================
server.use(bodyParser.json({ limit: "30mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
server.use(express.json());
server.use(cors());
// =====================================
server.use("/memory", memoryRouter);
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
