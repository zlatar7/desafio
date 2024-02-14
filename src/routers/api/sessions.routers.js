import { Router } from "express";
import { user } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.js"
import isValidPass from "../../middlewares/isValidPass.js";

const sessionsRouter = Router();

//  REGISTER
sessionsRouter.post("/register", has8char, async (req, res, next) => {
  try {
    const data = req.body;
    await user.create(data);
    return res.json({
      statusCode: 201,
      message: "Registered",
    });
  } catch (error) {
    return next(error);
  }
});

// LOGIN
sessionsRouter.post("/login", isValidPass, async (req, res, next) => {
  try {    
    const { email, password } = req.body;
    if (email && password === "pedropedrogon1999") {
      req.session.email = email;
      req.session.role = "user";
      return res.json({
        statusCode: 200,
        message: "Logged in",
        session: req.session,
      });
    }
    const error = new Error("Bad Auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

// SIGNOUT
sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Signed out",
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
