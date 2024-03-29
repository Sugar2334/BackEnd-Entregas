const express = require('express')
require('../utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})
const controller = require('../controllers/upload')

const router = express.Router()



router.post(
    `/`,
    controller.upload,
    controller.uploadFile
)


module.exports = router