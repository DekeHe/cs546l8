const express=require('express')
const router=express.Router()
const collectionsIduf =require('../collectionsIduf')
const userData=collectionsIduf.userCollectionIduf

router
    .get
    (
        '/',
        async function(req,res) 
        {
            try 
            {
                let userList=await userData.getAllUsers()
                res.json(userList)
            } catch (e){res.sendStatus(500)  }
        }
    )

router
    .post
    (
        '/',
        async function(req,res) 
        {
            let userInfo=req.body

            if (!userInfo)res.status(400).json({error:'You must provide input to create a user'})

            if (!userInfo.firstName)res.status(400).json({error:'You must provide a first name'})

            if (!userInfo.lastName)res.status(400).json({error:'You must provide a last name'})

            try 
            {
                const newUser=await userData.addUser
                (
                    userInfo.firstName,
                    userInfo.lastName
                )
                res.json(newUser)
            } catch (e){res.sendStatus(500)}
        }
    )
router
    .get
    (
        '/:id',
        async function(req,res) 
        {
            try 
            {
                let user=await userData.getUserById(req.params.id)
                res.json(user)
            } catch (e){res.status(404).json({error:'User not found'})}
        }
    )
    
router
    .put
    (
        '/:id',
        async function(req,res) 
        {
            let userInfo=req.body

            if (!userInfo){
                res.status(400).json({error:'You must provide input to update a user'})
                return
            }

            if (!userInfo.firstName){
                res.status(400).json({error:'You must provide a first name'})
                return
            }

            if (!userInfo.lastName){
                res.status(400).json({error:'You must provide a last name'})
                return
            }

            try 
            {
                await userData.getUserById(req.params.id)
            } catch (e){res.status(404).json({error:'User not found'})}
            try 
            {
                const updatedUser=await userData.updateUser(req.params.id,userInfo)
                res.json(updatedUser)
            } catch (e){ res.sendStatus(500)}
        }
    )

router
    .delete
    (
        '/:id',
        async function(req,res) 
        {
            try {
                await userData.getUserById(req.params.id)
            } catch (e){
                res.status(404).json({error:'User not found'})
                return
            }

            try {
                await userData.removeUser(req.params.id)
                res.sendStatus(200)
            } catch (e){
                res.sendStatus(500)
            }
 })

module.exports=router
