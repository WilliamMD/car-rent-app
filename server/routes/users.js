const router = require("express").Router();
const UserController = require("../controllers/UserController");
const upload = require("../middlewares/multer");
const { authentication, authorizeAdmin } = require("../middlewares/auth");

router.get("/", UserController.show);
router.get("/details", authentication, UserController.getById);
router.post("/register", UserController.register);
router.post("/login", UserController.loginUser);
router.post("/admin/login", UserController.loginAdmin);
router.put("/update", authentication, UserController.update);
router.delete("/delete/:id", UserController.delete);
router.put(
  "/upload",
  authentication,
  upload.single("avatar"),
  UserController.uploadAvatar
);

module.exports = router;
