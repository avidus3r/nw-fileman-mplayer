module.exports = {
    selectFolder:function(e){
        var files = e.target.files;
        var filePath = files[0].path;
        var folder = filePath.replace(filePath.substring(filePath.lastIndexOf("\\")+1, filePath.length),'');
        e.target.nextElementSibling.setAttribute('value', folder);
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'block';
    },

    selectUI: function(choice){
        var el = document.querySelector('#' + choice);
        document.querySelector('.choices').style.display = 'none';
        el.style.display = 'block';
    },

    handleFolders: function(){
        var paths = document.querySelectorAll('.folderPath');

        paths.forEach(function(item, index){
            //document.write(item.value + " " + index);
            fs.readdir(item.value, {encoding:'utf8'}, function(err, files){
                if(err){
                    console.error(JSON.stringify(err));
                }
                var listItems = [];
                for(var i=0;i<files.length;i++){
                    var li = document.createElement('li');
                    li.innerText = files[i];
                    document.querySelectorAll('#fileLists ul')[index].appendChild(li);
                }

            });
        });
    },

    manageFolder: function(){
        var paths = document.querySelectorAll('#manage .folderPath');
        var currentPath = null;
        var filename = null;
        var exifColl = [];
        paths.forEach(function(item, index){
            currentPath = item.value;
            fs.readdir(item.value, {encoding:'utf8'}, function(err, files){
                if(err){
                    console.error(JSON.stringify(err));
                }
                var listItems = [];
                console.log(currentPath);
                for(var i=0;i<files.length;i++){
                    filename = path.join(currentPath, files[i]);
                    var fname = "";
                    try {
                        new ExifImage({ image : filename }, function (error, exifData) {
                            if (error)
                                console.error('Error: '+error.message);
                            else
                                fname = filename;
                            var obj = {'src': fname};
                            var exobj = Object.assign(obj,exifData);
                            exifColl.push(exobj);
                        });
                    } catch (error) {
                        console.log('Error: ' + error.message);
                    }
                    /*if(i < 50){
                     fs.readFile(path.join(currentPath, files[i]), function(err, data){
                     var metadata = exif(data);
                     debugger
                     console.log(metadata);
                     });
                     }*/

                    var li = document.createElement('li');
                    li.innerText = files[i];
                    document.querySelectorAll('#manage #fileList ul')[index].appendChild(li);
                }
                console.log(exifColl);
            });
        });
    }
};