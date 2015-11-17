Sections.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Pages.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Uploads.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();

//
// Sections
//
Meteor.publish('sections', function(){
  return Sections.find();
});

Meteor.publish('singleSection', function(sectionId){
  return Sections.find({_id: sectionId});
});

Meteor.publish('sectionsForNav', function(){
  return Sections.find({active: true}, {fields:{title: 1, order: 1}}, {sort: {order: 1}});
});

Meteor.publish('section', function(slug){
  return Sections.find({title: slug});
});

//
// Pages
//
Meteor.publish('pages', function(){
  return Pages.find();
});

Meteor.publish('pagesTitle', function(){
  return Pages.find({fields:{title:1}});
});

Meteor.publish('pagesFromSection', function(slug){
  section = Sections.findOne({title: slug});
  return Pages.find({sectionId: section._id});
});

//
// Uploads
//
Meteor.publish('uploads', function() {
  return Uploads.find();
});