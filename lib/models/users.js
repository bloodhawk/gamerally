var friends = require('mongoose-friends');
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');
var Moment = require('moment');
var ObjectID =  mongoose.Schema.Types.ObjectId;
var strValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 300],
    message: 'Exceeded 300 characters'
  })
];

var schema = mongoose.Schema({
    steamid: {type: String, unique: true, required: true},
    displayname: {type: String, required: true},
    profileurl: {type: String},
    avatarmd: {type: String},
    avatarthumb: {type: String},
    avatarlg: {type: String},
    timezone: {type: String},
    age: {type: Number, min: 0, max:100, default: 0},
    info: {type: String, validate: strValidator, required: true, default: 'Enter your gamertags/public profiles here. Also list anything else you feel is pertinent for others to see when browsing your profile.'},
    type: {type: String, enum:['Casual', 'Pro', 'Hardcore'], required: true, default: 'Casual'},
    games: [{
        thumb: {type: String, trim: true},
    	title: {type: String, trim: true, required: true},
    	avail: {
            start: {type: Date, required: true},
            end: {type: Date, required: true}
        },
        platforms: {type: Object, required: true},
        platform: {type: String, required: true}
    }],
    inbox: [{ 
    	sender: {type: ObjectID, ref: 'User'},
    	sent: {type: Date, required: true, default: Moment().utc().toDate()},
    	message: {type: Object, subject: {type: String, validate: strValidator}, message: {type: String, validate: strValidator}}
    }],
    countercheck: [{type: ObjectID}]
});

schema.plugin(friends({pathName: "friends"}));
schema.plugin(uniqueValidator);

var User = mongoose.model("User", schema);
module.exports = User;