const e = require('express')
const { User, Project, Employee, EmployeeProject } = require('../models/index')


class Controller {
    static home(req, res){
        console.log(req.session)
        res.render('home')
    }

    static add_dataForm(req, res){
        console.log(req.session)
        res.render('add_data')
    }

    static add_data(req, res){
        
        let newEmployee = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role: req.body.role,
            UserId: req.session.UserId
        }

        if(req.session.UserId){
            Employee.findOne({
                where:{
                    UserId: req.session.UserId
                }   
            })
                .then(data => {
                    console.log(data)
                    if(data){
                        res.send('sudah mempunyai data')
                    }else{
                        Employee.create(newEmployee)
                        req.session.role = newEmployee.role
                        res.redirect('/')
                    }
                })
                .catch(err => {
                    res.send(err)
                })
        }else{
            res.send('belum login')
        }
    }

    static registerForm(req, res){
        res.render('register')
    }

    static register(req, res){
        
        let newUser = {
            username: req.body.username,
            password: req.body.password
        }


        User.create(newUser)
            .then(data => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static loginForm(req, res){
        res.render('login')
    }

    static login(req, res){

        User.findOne({
            where:{
                username: req.body.username
            }
        })
            .then(data => {
                if(data && data.password === req.body.password){
                    req.session.UserId = data.id

                    return Employee.findOne({
                        where:{
                            UserId: req.session.UserId
                        }   
                    })
                }
                else{
                    res.redirect('/login')
                }
            })
            .then(data => {
                if(data){
                    req.session.role = data.role
                    res.redirect('/')
                }else{
                    res.redirect('/')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listEmployee(req, res){
        
        Employee.findAll()
            .then(data => {  
                res.render('list_employee', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static add_projectForm(req, res){
        console.log(req.session)
        res.render('add_project')
    }

    static add_project(req, res){
        
        let newProject = {
            name: req.body.name,
            deadline: req.body.deadline
        }

        if(req.session.role === 'Project Manager'){
            Project.create(newProject)
            .then(data => {
                res.send('berhasil menambahkan project')
            })
            .catch(err => {
                res.send(err)
            })  
        } else {
            res.send('Anda bukan Manager')
        }   
    }

    static listProject(req, res){
        
        Project.findAll({
            order:[['id','ASC']]
        })
            .then(data => {

                res.render('list_project', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit_projectForm(req, res){
        const id = req.params.id

        Project.findByPk(id)
            .then(data => {
                let convertDate = new Date(data.deadline).toISOString()
                convertDate = convertDate.split('T')[0]

                res.render('edit_project', { data, convertDate })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit_project(req, res){
        const id = req.params.id

        let updateProject = {
            name: req.body.name,
            deadline: req.body.deadline
        }

        Project.update(updateProject, {
            where:{
                id: id
            }
        })
            .then(data => {
                res.redirect('/project')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete_project(req, res){
        const id = req.params.id

        Project.destroy({
            where:{
                id: id
            }
        })
            .then(data => {
                res.redirect('/project')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller