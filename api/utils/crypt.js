import bcrypt from "bcrypt"

/**
 * Function to encrypt a given password
 * @function
 * @async
 * @group encryption
 * @param {String} password - password to encrypt
 * @returns {String} - encrypted password
 */
const encryptedPassword = async (password) =>{
    const saltRounds = 8
    const encryptedPass = await bcrypt.hash(password, saltRounds)
    return encryptedPass
}

/**
 * Function to compare a given password with the encrypted password in DB
 * @function
 * @async
 * @group encryption
 * @param {*} insertedPassword - Password inserted in login
 * @param {*} cryptedPassword - Encrypted password of the user being logged in
 * @returns {Boolean} - Success or fail compare
 */
const matchPassword = async (insertedPassword, encryptedPassword) =>{
    const match = await bcrypt.compare(insertedPassword, encryptedPassword)
    return match
}

export default {encryptedPassword, matchPassword}