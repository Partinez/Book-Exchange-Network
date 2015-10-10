Template.header.onRendered(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true
  });
})

Template.header.helpers({
  username: function() {
    return Meteor.user().profile.name;
  }
})
