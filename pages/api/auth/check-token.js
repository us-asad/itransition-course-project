import { getResData, universalHandler } from "utils/functions";

export default function handler(req, res) {
  universalHandler("GET", true, { req, res }, "", data => {
    res.status(200).send(getResData(true, "valid json web token", data));
  });
}