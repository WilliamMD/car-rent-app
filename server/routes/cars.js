const router = require("express").Router();
const CarController = require("../controllers/CarController");
const upload = require("../middlewares/multer");
const { authorizeAdmin, authorization } = require("../middlewares/auth");

// admin
router.get("/user_cars", authorizeAdmin, CarController.getUserCar);
router.post("/add", upload.array("file", 4), authorizeAdmin, CarController.add);
router.put(
  "/update/:id",
  authorizeAdmin,
  authorization,
  upload.array("file", 4),
  CarController.update
);
router.delete(
  "/delete/:id",
  authorizeAdmin,
  authorization,
  CarController.delete
);

router.get("/details/:id", CarController.getById);
router.get("/", CarController.show);
module.exports = router;
