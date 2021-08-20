const router = require('express').Router();
const CarController = require('../controllers/CarController')
const upload = require('../middlewares/multer')
const { authorizeAdmin, authorization } = require('../middlewares/auth')

router.get('/', CarController.show);
router.get('/details/:id', CarController.getById);
router.get('/user_cars/:id', CarController.getUserCar);

// admin
router.post('/add', authorizeAdmin, CarController.add);
router.put('/update/:id', authorizeAdmin, authorization, upload.array("file", 4), CarController.update);
router.delete('/delete/:id', authorizeAdmin, authorization, CarController.delete);

module.exports = router ;