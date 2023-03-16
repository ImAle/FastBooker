import express from 'express'

const router = express.Router()

router.get("/", (req,res)=>{
    res.send('Autenticación')
})

router.get("/register", (req,res)=>{
    res.send('Registro')
})

export default router