const router = require("express").Router();
const LineItemController = require("../controllers/LineItemController");
const {
  authentication,
  authorizationCart,
  authorizeAdmin,
} = require("../middlewares/auth");

router.post("/add/:CarId", authentication, LineItemController.createCart);
router.delete(
  "/delete/:CartId/:LineItemId",
  authentication,
  authorizationCart,
  LineItemController.deleteCart
);
router.put("/checkout", authentication, LineItemController.addCheckout);
// router.put("/checkout_all", authentication, LineItemController.checkoutAll);
// router.delete(
//   "/checkout/clear",
//   authentication,
//   LineItemController.deleteCheckout
// );
router.get("/cart", authentication, LineItemController.getCart);
router.get("/cart/checkout", authentication, LineItemController.getCheckout);
router.post(
  "/cart/pay/:CartId",
  authentication,
  authorizationCart,
  LineItemController.pay
);
router.get("/order", authentication, LineItemController.getOrder);
router.get(
  "/admin/order",
  authentication,
  authorizeAdmin,
  LineItemController.getOrderAdmin
);
router.get(
  "/admin/order/done",
  authentication,
  authorizeAdmin,
  LineItemController.getOrderAdminDone
);
router.put(
  "/admin/status",
  authentication,
  authorizeAdmin,
  LineItemController.changeStatus
);

module.exports = router;
