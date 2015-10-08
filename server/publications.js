Meteor.publish('posts', function() {
  return Posts.find();
});
Meteor.publish('users', function(username) {
  return Meteor.users.find({'profile.name' : username},{profile:1});
})
