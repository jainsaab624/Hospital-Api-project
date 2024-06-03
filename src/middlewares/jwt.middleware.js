import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const { jwtToken } = req.cookies;
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: "unauthorized! login to continue",
        });
      } else {
        req._id = data.userId;

        req.username = data.username;
        next();
      }
    });
  } catch {
    return new Error("something went wrong with authorizing the user");
  }
};
