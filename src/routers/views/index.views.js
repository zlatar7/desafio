import { Router, json } from "express";
import productsRouter from "./real.views.js";
import formRouter from "./form.views.js";
import registerRouter from "./register.views.js";
import loginRouter from "./login.views.js";
import ordersRouter from "./orders.views.js";
// import product from "../../data/fs/products.fs.js";
import { product, user } from "../../data/mongo/manager.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: "asc" },
      lean: true
    };
    let filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.sort === "desc") {
      sortAndPaginate.sort.title = "desc";
    }
    
    const prods = await product.read({ filter, sortAndPaginate })
    return res.render("index", {
      products: prods.docs,
      next: prods.nextPage,
      prev: prods.prevPage,
      title: "INDEX",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", productsRouter);
viewsRouter.use("/form", formRouter);
viewsRouter.use("/auth", registerRouter);
viewsRouter.use("/auth", loginRouter)
viewsRouter.use("/orders", ordersRouter)

export default viewsRouter;
