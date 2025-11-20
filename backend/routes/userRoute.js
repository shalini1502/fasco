// import express from "express";
// import {
//   loginUser,
//   registerUser,
//   loginAdmin,
// } from "../controllers/userController.js";

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/admin", loginAdmin);

// export default userRouter;

// backend/routes/userRoute.js
import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", loginAdmin);

// protected profile endpoints
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

export default router;
