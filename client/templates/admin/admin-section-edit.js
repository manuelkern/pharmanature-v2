Template.adminEditSection.onCreated(function(){
  var self = this;
  self.autorun(function() {
    var sectionId = FlowRouter.getParam('sectionId');
    self.subscribe('singleSection', sectionId);  
  });
  var sectionId = FlowRouter.getParam('sectionId');
  Uploader.finished = function(index, file) {
    var thumbnailPath = file.baseUrl + file.subDirectory + '/thumbnail/' + file.name;
    Sections.update({_id: sectionId}, {$set: {image: file, thumbnail: thumbnailPath}});
  };
});

Template.adminEditSection.helpers({
  section: function() {
    var sectionId = FlowRouter.getParam('sectionId');
    var section = Sections.findOne({_id: sectionId}) || {};
    return section;
  },
  myCallbacks: function() {
    return {
      formData: function() { 
        return { 
          directoryName: "sectionimage", 
          collection: "Sections", 
          _id: this._id 
        };
      }
    };
  }
});

Template.adminEditSection.events({
  'submit #section-edit-form': function(event) {
    event.preventDefault();
    var currentSectionId = this._id;
    var sectionProperties = {
      title: $(event.target).find('[name=title]').val()
    };
    Sections.update(currentSectionId, {$set: sectionProperties}, function(error) {
      if (error) {
        sAlert.error(error.reason);
      } else {
        sAlert.success('Section updated');
      }
    });
  }
});