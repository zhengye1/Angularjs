/**
 * Created by zhenye1 on 24/03/15.
 */
"use strict;"
var fs = require('fs');
var generator = require('mongoose-gen');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require(__dirname + '/../config');

// Connect to database
mongoose.connect('mongodb://' + config.dbuser + ':' + config.dbpass + '@' + config.dbhost+ '/' + config.dbname);


var ProductSchema = new Schema({
    name: {type:String, require: true},
    price:{type:Number, require: true},
    description: {type:String, require: true},
    image:[{full:String, thumb:String}],
    specification:String,
    reviews:[{stars:{type:Number, require: true},
              body:{type:String, require: true},
              author:{type:String, require: true},
              createdOn:Date}]
});

//Models
var Product = mongoose.model('Product', ProductSchema);

exports.api = function(req, res){
    res.status(200).send('<h3>Eatz API is running</h3>');
};