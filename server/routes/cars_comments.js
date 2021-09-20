const router = require("express").Router();
const CarCommentController = require("../controllers/CarCommentController");
const { authorization, authentication } = require("../middlewares/auth");

router.post("/add/:CarId", authentication, CarCommentController.add);
router.get("/car/rating/:CarId", CarCommentController.totalRating);
router.get("/car/:CarId", CarCommentController.showByCar);

module.exports = router;
