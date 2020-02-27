const mongoose = require("mongoose");

const Notification = new mongoose.Schema({
    cursoId: {type: String},
    fcmToken: {type: String}
});

module.exports = mongoose.model("Notification", Notification);