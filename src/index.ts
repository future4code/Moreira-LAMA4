import { app } from "./controller/app";
import { bandRouter } from "./router/BandRouter";
import { concertRouter } from "./router/ConcertRouter";
import { userRouter } from "./router/UserRouter";

app.use("/users", userRouter);
app.use("/concerts", concertRouter);
app.use('/bands', bandRouter);