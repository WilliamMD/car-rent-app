const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

const CarCommentRoutes = require("./cars_comments");
const CarRoutes = require("./cars");
const LineItemRoutes = require("./line_items");
const UserRoutes = require("./users");

router.use("/cars_comments", CarCommentRoutes);
router.use("/cars", CarRoutes);
router.use("/line_items", LineItemRoutes);
router.use("/users", UserRoutes);

module.exports = router;
