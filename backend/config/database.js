const mongoose= require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/collage')
        console.log('mongoDB conect Successfully !!')
    } catch (err) {
        console.log('mongoDB conect SFaild !!')
        console.log(err)
    }
}

module.exports= connectDB;