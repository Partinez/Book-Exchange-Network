Template.newPostModal.events({
  'click .openModal': function() {
    $('#newPostModal')
      .modal({
        onDeny    : function(){
          //Clear the form:
          $('[name=title]').val('');
          $('[name=author]').val('');
          $('[name=comments]').val('');
          return "hide";
        },
        onApprove : function() {
          var post = {
            title: $('[name=title]').val(),
            author: $('[name=author]').val(),
            comments: $('[name=comments]').val()
          };
          //Clear the form:
          $('[name=title]').val('');
          $('[name=author]').val('');
          $('[name=comments]').val('');

          Meteor.call('postInsert', post, function(error, result) {
            //display error
            if (error) {
              return alert(error.reason);
            }
            Router.go('postPage', {_id: result._id});
          });
        }
      })
      .modal('show')
    ;
  }
});
