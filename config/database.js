const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_STRING,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

// export modules
module.exports = connectDB;