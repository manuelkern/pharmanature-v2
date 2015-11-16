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
  },
  setActiveSection: function(sectionId, value){
    var section = Sections.findOne(sectionId);
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      Sections.update(sectionId, {$set: {active: value}});
    }
  },
  addImageToSection: function(sectionId, file){
    Sections.update(sectionId, {$set: {image: file}});
  }
});