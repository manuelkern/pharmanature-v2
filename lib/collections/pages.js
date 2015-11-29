Pages = new Mongo.Collection('pages');

// Pages.after.insert(function(doc){
  
//   pageId = this._id;
//   pageObj = Pages.findOne({_id: pageId});
//   sectionId = pageObj.sectionId;
  
//   Sections.update({_id: sectionId}, {$addToSet: {'pagesIds': pageId}});

// });

Pages.helpers({
  section: function () {
    return Sections.findOne(this.sectionId);
  }
});