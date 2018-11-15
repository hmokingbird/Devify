const collections = require("../config/mongoCollections")
const userData = collections.Users
const uuid = require("node-uuid");


const addUser = async (userName) => {
    if(!userName) throw "No user id"

    let userObject = {
        _id: uuid(),
        UserID: userName
    }

    const userCollection = await userData()
    const addUser = await userCollection.insertOne(userObject)
    if (addUser.insertedCount === 0) throw "Could not create the recipe";

}

const getUser = async (name)  => {
    if(!name) throw "No id was provided"
    const userCollection = await userData()
    const findUser = await userCollection.findOne({UserID : name})

    if (findUser === null){
        return false;
    }

    return findUser;    
}

module.exports = {
    addUser,
    getUser
}