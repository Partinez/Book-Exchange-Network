Template.header.onRendered(function() {
  $(".button-collapse").sideNav();
})

Template.header.helpers({
  username: function() {
    return Meteor.user().profile.name;
  }
})
