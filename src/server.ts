import bodyParser from "body-parser";
import express, {Express} from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv"
import commentsRoutes from "./routes/comments_route";
import postsRoutes from "./routes/posts_route";


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use("/auth", authRoutes);
app.use("/comments", commentsRoutes);
app.use("/posts", postsRoutes);

export const initApp = async (): Promise<Express> => {
    const dbConnect = process.env.DB_CONNECT;
    if (!dbConnect) {
        throw new Error("DB_CONNECT is not defined in .env file");
    }

    try {
        await mongoose.connect(dbConnect);
        return app;
    } catch (error) {
        throw error;
    }
};