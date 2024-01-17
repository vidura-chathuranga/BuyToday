import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // generate the jsonwebtoken
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // set jwt as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60000 * 60 * 60 * 24, //1 day
  });
};

export default generateToken;