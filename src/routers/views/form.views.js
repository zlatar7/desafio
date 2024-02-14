import { Router } from "express";

const formRouter = Router();

formRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form", { title: "FORM" });
  } catch (error) {
    next(error);
  }
});

export default formRouter;
