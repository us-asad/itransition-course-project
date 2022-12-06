import User from "models/User";
import { getApiValidates, getObjKeys, getResData, universalHandler } from "utils/functions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const validates = getApiValidates("email 2 100, password 6 500");
  universalHandler("POST", false, { req, res }, validates, async () => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send(getResData(false, "User not found", { message: "user not found with this email", field: "email" }));

    const isCorrectPwd = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrectPwd) return res.status(400).send(getResData(false, "Incorrect password", { message: "incorrect password", field: "password" }));

    const data = getObjKeys(user, "name email isAdmin _id createdAt");
    let token = null;

    try {
      token = jwt.sign(data, process.env.JWT_SIGN);
    } catch (ex) {
      return res.status(500).send(getResData(false, ex.message || "Server Error"));
    }

    res.status(200).send(getResData(true, "logged in", { token, user: data }));
  })
}