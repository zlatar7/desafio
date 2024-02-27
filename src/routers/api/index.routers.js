import { Router } from "express";
import usersRouter from "./users.routers.js";
import productsRouter from "./products.routers.js";
import ordersRouters from "./orders.routers.js";
import sessionsRouter from "./sessions.routers.js";
import passCallback from "../../middlewares/passCallback.js";

const apiRouter = Router()

apiRouter.use("/users",usersRouter)
apiRouter.use("/products",productsRouter)
apiRouter.use("/orders", passCallback("jwt"), ordersRouters)
apiRouter.use("/sessions", sessionsRouter)

export default apiRouter;