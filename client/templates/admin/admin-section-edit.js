Template.adminEditSection.onCreated(function(){
  // $('.admin-nav-wrapper').removeClass('hidden');
  var self = this;
  self.autorun(function() {
    var sectionId = FlowRouter.getParam('sectionId');
    self.subscribe('singleSection', sectionId);  
  });
  var sectionId = FlowRouter.getParam('sectionId');
  Uploader.finished = function(index, file) {
    var thumbnailPath = file.baseUrl + file.subDirectory + '/thumbnail/' + file.name;
    file.thumbnail = thumbnailPath;
    Sections.update({_id: sectionId}, {$set: {image: file}});
  };
});

// Template.adminEditSection.onRendered(function(template){
//   this.autorun(function(){
//     if(Template.instance().subscriptionsReady()){
//       Tracker.afterFlush(function(){
//         var $title = this.$('.section-title');
//         var $form = this.$('.form-wrapper');
//         var enter = new TimelineMax();
//         console.log($form);
//         enter
//           .from($title, 0.4, {opacity:0, y:'50', clearProps: 'all'})
//           .from($form, 0.4, {opacity: 0, y:'100', clearProps: 'all'}, '-=0.2');
//       });
//     }
//   });
// });

Template.adminEditSection.helpers({
  section: function() {
    var sectionId = FlowRouter.getParam('sectionId');
    var section = Sections.findOne({_id: sectionId}) || {};
    return section;
  },
  setUploader: function() {
    return {
      formData: function() { 
        return { 
          directoryName: "sectionimage", 
          collection: "Sections", 
          id: this._id 
        };
      }
    };
  },
 getFEContext: function() {
    var self = this;
    return {
      // Set html content
      _value: self.description,
      // Set some FE options
      toolbarInline: false,
      initOnClick: false,
      tabSpaces: false,
    };
  }
});

Template.adminEditSection.events({
  'submit #section-edit-form': function(event, template){
    event.preventDefault();
    // Vars
    var currentSectionId = this._id;
    var sectionTitle = template.$('#section-edit-form .title-form').val();
    var sectionSubTitle = template.$('#section-edit-form .sub-title-form').val();
    var sectionSlug = createURLSlug(sectionTitle);
    var sectionDescription = template.$('div.froala-reactive-meteorized').froalaEditor('html.get');
    // Properties
    var sectionProperties = {
      title: sectionTitle,
      subTitle: sectionSubTitle,
      slug: sectionSlug,
      description: sectionDescription
    };
    // Update Section
    Sections.update(currentSectionId, {$set: sectionProperties}, function(error) {
      if (error) {
        sAlert.error(error.reason);
      } else {
        sAlert.success('Section updated');
        FlowRouter.go('adminSections');
      }
    });
  },
  'submit #section-add-sub-section': function(event, template){
    event.preventDefault();
    var subSectionTitle = template.$('#section-add-sub-section .title-sub-section-form').val();
    var subSectionSlug = createURLSlug(subSectionTitle);
    var subSectionParent = this._id;
    var subSectionPath = this.path;
    var subSectionDoc = {
      title: subSectionTitle,
      slug: subSectionSlug,
      parent: subSectionParent,
      path: subSectionPath
    };
    Meteor.call('insertSection', subSectionDoc, function(error, result) {
      if(error){
        sAlert.error(error.reason);
      } else {
        sAlert.success('section created');
        event.target.title.value = '';
      }
    });
  },
  'click .delete-image': function(event, template){
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      var sectionId = FlowRouter.getParam('sectionId');
      var imagePath = this.image.path;
      var imageThumbnailPath = this.image.subDirectory + '/thumbnail/' + this.image.name;
      Meteor.call('deleteSectionImage', sectionId, imagePath, imageThumbnailPath);
    } else {
      sAlert.error('Access Denied');
    }
  },
  'click .close': function(event){
    // window.history.back();
  }
});