import jwt from "jsonwebtoken";
import { Message } from "../configs/message"
import Users from "../models/Users";

export const middlewareAuthorAdmin = async (req, res, next) => {
  try {
    const token = req.headers['access-token'];
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await Users.findById(payload.userID)
    if (user._idRole === "admin") {
      return next();
    }
    throw new Error()
  } catch (error) {
    return res.status(403).send({
      message: Message.KHONG_CO_QUYEN_TRUY_CAP
    })
  }
}

export const middlewareAuthorUser = async (req, res, next) => {
  try {
    const token = req.headers['access-token'];
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await Users.findById(payload.userID)
    if (user._idRole === "admin" || user._idRole === "user") {
      return next();
    }
    throw new Error()
  } catch (error) {
    return res.status(403).send({
      message: Message.KHONG_CO_QUYEN_TRUY_CAP
    })
  }
}