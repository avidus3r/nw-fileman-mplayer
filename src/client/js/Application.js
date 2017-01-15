var fs              = require('fs'),
    path            = require('path'),
    ExifImage       = require('exif').ExifImage,
    EventHandler    = require('./EventHandler'),
    UI              = require('./UI');

var Application = {
    start: function(){
        UI.init();
    }
};

module.exports = Application;