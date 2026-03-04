/* eslint-env node */
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    // eslint-disable-next-line no-undef
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (
      // eslint-disable-next-line no-undef
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.role !== "admin"
    ) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
