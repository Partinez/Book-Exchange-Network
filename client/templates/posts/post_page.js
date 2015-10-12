Template.postPage.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  debug : function() {
    return console.log(this);
  }
});
