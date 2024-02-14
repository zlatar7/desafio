import { Router } from "express";
import { Types } from "mongoose";
// import order from "../../data/fs/orders.fs.js";
import { order } from "../../data/mongo/manager.mongo.js";
import propsOrders from "../../middlewares/propsOrders.js";
import propsOrdersUpdate from "../../middlewares/propsOrdersUpdate.js";

const ordersRouters = Router();

ordersRouters.get("/total/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const isValidID = Types.ObjectId.isValid(uid);

    if (isValidID) {
      const reportBill = await order.report(uid);

      return res.json({ statusCode: 200, response: reportBill });
    } else {
      res.json({
        statusCode: 404,
        response: "El ID de la orden no existe en la base de datos",
      });
    }
  } catch (error) {
    return next(error);
  }
});

ordersRouters.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { name: "asc" },
    };
    const filter = {};
    const orders = await order.read({ filter, orderAndPaginate });

    if (orders.totalPages > 0) {
      return res.json({ statusCode: 200, response: orders });
    } else {
      return res.json({ statusCode: 404, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouters.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const isValidID = Types.ObjectId.isValid(oid);

    if (isValidID) {
      const obj = await order.readOne(oid);

      return res.json({ statusCode: 200, response: obj });
    } else {
      res.json({
        statusCode: 404,
        response: "El ID de la orden no existe en la base de datos",
      });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouters.post("/", propsOrders, async (req, res, next) => {
  try {
    const object = req.body;
    const obj = await order.create(object);
    return res.json({ statusCode: 201, response: obj });
  } catch (error) {
    return next(error);
  }
});

ordersRouters.put("/:oid", propsOrdersUpdate, async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const isValidID = Types.ObjectId.isValid(oid);

    if (isValidID) {
      const one = await order.update(oid, data);

      return res.json({ statusCode: 200, response: one });
    } else {
      res.json({
        statusCode: 404,
        response: "El ID de la orden no existe en la base de datos",
      });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouters.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const isValidID = Types.ObjectId.isValid(oid);

    if (isValidID) {
      const one = await order.destroy(oid);

      return res.json({ statusCode: 200, response: one });
    } else {
      res.json({
        statusCode: 404,
        response: "El ID de la orden no existe en la base de datos",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default ordersRouters;
