import { Router } from "express";
import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallback.js";

const sessionsRouter = Router();

//  REGISTER
sessionsRouter.post("/register", has8char, passCallBack("register"), async (req, res, next) => {
  try {
    return res.json({
      statusCode: 201,
      message: "Registered!",
    });
  } catch (error) {
    return next(error);
  }
});

// LOGIN
sessionsRouter.post("/login", passCallBack("login"), async (req, res, next) => {
  try {
    return res.cookie("token", req.token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .json({
      statusCode: 200,
      message: "Logged in!",
    });
  } catch (error) {
    return next(error);
  }
});

// SIGNOUT
sessionsRouter.post("/signout", passCallBack("jwt"), async (req, res, next) => {
  try {
    return res.clearCookie("token").json({
      statusCode: 200,
      message: "Signed out!",
    });
  } catch (error) {
    return next(error);
  }
});

// SIGNOUT/CB
sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Already done",
    });
  } catch (error) {
    return next(error);
  }
});

//BADAUTH
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

// GOOGLE
sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//GOOGLE-CALLBACK
sessionsRouter.post(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//GITHUB-CALLBACK
sessionsRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with github!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default sessionsRouter;
