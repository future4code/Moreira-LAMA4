import { app } from "./controller/app";
import { userRouter } from "./router/UserRouter";

app.use("/users", userRouter);