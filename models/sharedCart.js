
var mongoose = require('mongoose');
const product = require('./product');
const user = require('./user');

var Schema = mongoose.Schema;

var schema = new Schema({
    creator : {type: String, required: true},
    cartName: {type: String, required: true},
    lstParticipants: [{type: Schema.Types.ObjectId, ref: 'User'}],
    lstProducts: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    totalQty: {type: Number, default: 0},
    totalPrice: {type: Number, default: 0}
});

module.exports = mongoose.model('sharedCart', schema);