Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      title: $(e.target).find('[name=title]').val().trim(),
      author: $(e.target).find('[name=author]').val().trim(),
      comments: $(e.target).find('[name=comments]').val().trim()
    };

    Meteor.call('postInsert', post, function(error, result) {
      //display error
      if (error) {
        return alert(error.reason);
      }
      Router.go('postPage', {_id: result._id});
    });
  }
});
