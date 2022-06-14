// noinspection JSVoidFunctionReturnValueUsed

import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGO_URL}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))