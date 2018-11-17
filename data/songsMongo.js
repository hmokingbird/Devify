import { builtinModules } from "module";

const collections = require("../config/mongoCollections")
const songs = collections.Songs


const addSong = async (song) => {
    try {
        const collection = await songs()
        collection.insertOne(song)
    }
    catch (e) {
        throw e
    }
}

const getAllSongs = async () => {
    try {
        const collection = await songs()
        return tasks = collection.find({}).toArray()
    }
    catch (e) {
        throw e
    }
}

const getSong = async (id) =>{ 
    try {
        const collection = await songs()
        let tasks = collection.findOne({'_id': id})
        client.close()
        return tasks
    }
    catch (e) {
        throw e
    }
}

const replaceSong = async () => {
    try {
        
        const collection = await songs()
        collection.update({'_id': id},
            recipe)
        client.close()
        return recipe
    }
    catch (e) {
        throw e
    }
}

const updateSong = async (id, user, comment) => {
    try {
        const collection = songs()
        collection.updateOne({'_id': id},
            {$set: body})
        client.close()
        let updatedTask = getTask(id)
        return updatedTask
    }
    catch (e) {
        throw e
    }
}

export async function removeSong(id){
    try {
        const collection = await songs()
        collection.deleteOne({'_id': id})
    }
    catch (e) {
        throw e
    }
}

module.exports = {
    addSong,
    getAllSongs,
    getSong,
    updateSong,
    removeSong,
    replaceSong
}