Template.header.events({
  'click #at-nav-button': function() {
    if (!Meteor.user()) {
      $('#logInModal')
        .modal({
          onDeny    : function(){
            return "hide";
          },
          onApprove : function() {
            return "hide";
          }
        })
        .modal('show')
      ;
    }
  }
});

Template.loginModal.events({
  'click #at-btn': function() {
    $('#logInModal').modal('hide');
  }
});
