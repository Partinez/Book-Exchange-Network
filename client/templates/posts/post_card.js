Template.postCard.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
});
