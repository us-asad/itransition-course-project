import db from "./db";

export const getInputValidations = (required, minLength, maxLength) => {
  const validations = {};

  if (required) validations.required = "Please fill the input!";
  if (minLength) validations.minLength = {
    value: minLength,
    message: `characters should not be less than ${minLength}`
  }
  if (maxLength) validations.maxLength = {
    value: maxLength,
    message: `characters should not be more than ${maxLength}`
  }

  return validations;
}

export const getResData = (ok, message, data) => ({ ok, message, data: data || {} });

export const universalHandler = async (method, checkToken, { req, res }, validates, cb = Function.prototype) => {
  if (req.method !== method) return res.status(400).send(getResData(false, `Cannot ${req.method}`));
  let tokenData = null

  if (checkToken) {
    try {
      tokenData = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SIGN);
      if (!tokenData) return res.status(403).send(getResData(false, "Access denied"));
    } catch (ex) {
      return res.status(403).send(getResData(false, "Access denied"));
    }
  }

  if (validates?.length > 0) {
    try {
      validates.forEach(item => {
        if (!req.body[item.name]) throw new Error(`${item.name} is required!`);
        else if (req.body[item.name]?.length < item.minLength) throw new Error(`${item.name} should contain less than ${item.minLength} characters`);
        else if (req.body[item.name]?.length > item.maxLength) throw new Error(`${item.name} should contain more than ${item.maxLength} characters`);        
      })
    } catch (ex) {
      return res.status(400).send(getResData(false, ex.message));
    }
  }

  await db.connect();
  cb(tokenData);
}

export const getApiValidates = str => {
  let validates = str.split(", ");
  validates = validates.map(item => {
    const data = item.split(" ")
    return {
      name: data[0],
      minLength: data[1],
      maxLength: data[2]
    }
  });

  return validates;
}


export const getObjKeys = (data, keysStr) => {
  const keys = keysStr.split(" ");
  const newData = {};
  keys.forEach(key => newData[key] = data[key]);
  return newData
}

