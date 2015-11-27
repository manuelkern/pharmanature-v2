Sections.before.remove(function(doc){
  var sectionsId = this.transform()._id;
  var sections = Sections.find({'_id': {$in: [sectionsId]}}, {fields: {image: 1}});

  // var deleteImage = function(imagePath, imageThumbnailPath){
  //   UploadServer.delete(imagePath);
  //   UploadServer.delete(imageThumbnailPath);
  // };

  sections.map(function(section){
    if (section.image){
      var imagePath = section.image.path;
      var imageThumbnailPath = section.image.subDirectory + '/thumbnail/' + section.image.name;
      check(imagePath, String);
      check(imageThumbnailPath, String);
      UploadServer.delete(imagePath);
      UploadServer.delete(imageThumbnailPath);
    }
  });
});

Meteor.methods({
  insertMotherSection: function(doc){
    var order = Sections.find({parent: null}).count();
    doc.order = order;
    if (Roles.userIsInRole(Meteor.user(), ['admin'])){
      Sections.insert(doc);
    }
  },
  insertSection: function(doc){
    var parentId = doc.parent;
    var order = Sections.find({parent: parentId}).count();
    doc.order = order;
    if (Roles.userIsInRole(Meteor.user(), ['admin'])){
      Sections.insert(doc);
    }
  },
  decreaseOrder: function(order){
    Sections.update({order: {$gt: order}}, {$inc: {order: -1}}, {multi: true});
  },
  deleteSection: function(sectionId){
    Sections.remove({
      path: {
        $all: [sectionId]
      }
    });
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

  // deleteSection: function(sectionId){
  //   var section = Sections.findOne(sectionId);
  //   Sections.remove({
  //     path: {
  //       $all: [sectionId]
  //     }
  //   });
  //   // Remove image if it exists
  //   if (section.image){
  //     var imagePath = section.image.path;
  //     var imageThumbnailPath = section.image.subDirectory + '/thumbnail/' + section.image.name;
  //     check(imagePath, String);
  //     check(imageThumbnailPath, String);
  //     UploadServer.delete(imagePath);
  //     UploadServer.delete(imageThumbnailPath);
  //   }
  // },