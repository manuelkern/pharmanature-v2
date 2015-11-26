Meteor.methods({
  insertSection: function(doc){
    var order = Sections.find().count();
    doc.order = order;
    if (Roles.userIsInRole(Meteor.user(), ['admin'])){
      Sections.insert(doc);
    }
  },
  decreaseOrder: function(order){
    Sections.update({order: {$gt: order}}, {$inc: {order: -1}}, {multi: true});
  },
  deleteSection: function(sectionId){
    var section = Sections.findOne(sectionId);
    Sections.remove(sectionId);
    // Remove image if it exists
    if (section.image){
      var imagePath = section.image.path;
      var imageThumbnailPath = section.image.subDirectory + '/thumbnail/' + section.image.name;
      check(imagePath, String);
      check(imageThumbnailPath, String);
      UploadServer.delete(imagePath);
      UploadServer.delete(imageThumbnailPath);
    }
  },
  setActiveSection: function(sectionId, value){
    var section = Sections.findOne(sectionId);
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      Sections.update(sectionId, {$set: {active: value}});
    }
  },
  deleteSectionImage: function(sectionId, imagePath, imageThumbnailPath){
    check(imagePath, String);
    check(imageThumbnailPath, String);
    Sections.update(sectionId, {$unset: {image: ''}});
    UploadServer.delete(imagePath);
    UploadServer.delete(imageThumbnailPath);
  },
});