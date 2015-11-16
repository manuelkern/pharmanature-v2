Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, //create the directories for you
    overwrite: true,
    imageVersions: {
      thumbnail: {width: 200, height: -1}
    },
    getDirectory: function(fileInfo, formData){
      return formData.directoryName;
    }
  });
});