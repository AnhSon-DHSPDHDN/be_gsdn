import { Message } from "../configs/message";
import jwt from 'jsonwebtoken';
import Users from "../models/Users";


export const middlewareAuth = async (req, res, next) => {
  try {
    const token = req.headers['access-token'];
    const payload = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await (await Users.findById(payload.userID)).toObject()
    if (!user) throw new Error()
    delete user.password
    req.user = user
    next()
  } catch (error) {
    return res.status(403).send({
      message: Message.TAI_KHOAN_OR_MK_SAI
    })
  }
}