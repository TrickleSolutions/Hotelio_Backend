const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})


const CustomerAuthModel = mongoose.model("customers", schema);

module.exports = CustomerAuthModel