import bcrypt from "bcrypt"

const cryptedPassword = async (password) =>{
    const saltRounds = 8
    const cryptedPass = await bcrypt.hash(password, saltRounds)
    return cryptedPass
}

const matchPassword = async (insertedPassword, cryptedPassword) =>{
    const match = await bcrypt.compare(insertedPassword, cryptedPassword)
    return match
}

export default {cryptedPassword, matchPassword}