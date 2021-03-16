import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import statRoutes from "./routes/stat.js";
import statListRoutes from "./routes/statList.js";
import timelineRoutes from "./routes/timeline.js";

const app = express();
app.use(bodyParser.json({ limit: "1mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(cors());
app.use("/user", userRoutes);
app.use("/stat", statRoutes);
app.use("/statList", statListRoutes);
app.use("/timeline", timelineRoutes);

const CONNECTION_URL =
  "mongodb+srv://everyone:everyone@cluster0.dfkfk.mongodb.net/trendly?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
mongoose.set("useFindAndModify", false);
