Template.adminEditPage.events({
  'submit #page-edit-form': function(event) {
    event.preventDefault();

    var currentPageId = this._id;

    var pageProperties = {
      title: $(event.target).find('[name=title]').val()
    };

    Pages.update(currentPageId, {$set: pageProperties}, function(error) {
      if (error) {
        sAlert.error(error.reason);
      } else {
        sAlert.success('Page updated');
        Router.go('adminSections');
      }
    });
  }
});