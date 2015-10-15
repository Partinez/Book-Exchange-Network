Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      author: $(e.target).find('[name=author]').val().trim(),
      title: $(e.target).find('[name=title]').val().trim(),
      comments: $(e.target).find('[name=comments]').val().trim(),
    }

    var errors = validatePost(postProperties);
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



    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
