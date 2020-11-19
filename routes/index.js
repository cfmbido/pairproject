const router = require('express').Router()
const Controller = require('../controllers/controller')



router.get('/', Controller.home)

router.get('/employee', Controller.listEmployee)

router.get('/add_data', Controller.add_dataForm)
router.post('/add_data', Controller.add_data)

router.get('/project', Controller.listProject)

router.get('/project/add', Controller.add_projectForm)
router.post('/project/add', Controller.add_project)

router.get('/project/edit/:id', Controller.edit_projectForm)
router.post('/project/edit/:id', Controller.edit_project)

router.get('/project/delete/:id', Controller.delete_project)


router.get('/register', Controller.registerForm)
router.post('/register', Controller.register)

router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)

// router.get('/timeline', Controller.timeline)




module.exports = router