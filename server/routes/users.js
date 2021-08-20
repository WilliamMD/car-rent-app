const router = require('express').Router();
const UserController = require('../controllers/UserController')
const upload = require('../middlewares/multer')
const {authentication} = require('../middlewares/auth')

router.get('/', UserController.show);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/update', authentication, UserController.update);
router.delete('/delete/:id', UserController.delete);
router.put('/upload', authentication, upload.single("avatar"), UserController.uploadAvatar);

module.exports = router ;