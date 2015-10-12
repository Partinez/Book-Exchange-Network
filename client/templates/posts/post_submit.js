Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      title: $(e.target).find('[name=title]').val().trim(),
      author: $(e.target).find('[name=author]').val().trim(),
      comments: $(e.target).find('[name=comments]').val().trim()
    };

    var errors = validatePost(post);
    if ( errors.title || errors.author) {
      if (errors.title) {
        $('#title-l').attr('data-error','The title field is required');
        $('#title-l').addClass('active');
        $('#title').addClass('invalid');
      }
      if (errors.author) {
        $('#author-l').attr('data-error','The author field is required');
        $('#author-l').addClass('active');
        $('#author').addClass('invalid');
      }
      return
    }

    Meteor.call('postInsert', post, function(error, result) {
      //display error
      if (error) {
        return throwError(error.reason);
      }
      Router.go('postPage', {_id: result._id});
    });
  }
});
