import User from "models/User";
import { getApiValidates, getResData, universalHandler, getObjKeys } from "utils/functions";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default function handler(req, res) {
  const validates = getApiValidates("name 2 150, email 2 100, password 6 500");
  universalHandler("POST", false, { req, res }, validates, async () => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(getResData(false, "Email already used!", { message: "email is already used", field: "email" }));

    let data = getObjKeys(req.body, "name email password");
    data.password = await bcrypt.hash(data.password, 12);
    user = await User.create(data);

    let token = null;
    data = getObjKeys(user, "name email isAdmin _id createdAt");
    
    try {
      token = jwt.sign(data, process.env.JWT_SIGN);
    } catch (ex) {
      return res.status(500).send(getResData(false, ex.message || "Server Error"));
    }

    res.status(201).send(getResData(true, "created", { token, user: data }));
  })
}