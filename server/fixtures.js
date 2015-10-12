if (Posts.find().count() === 0) {
  var now = new Date().getTime();
    // create two users
  var tomId = Meteor.users.insert({
     profile: {name: 'Tom_Coleman'}
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
      profile: {name: 'Sacha_Greif'}
  });
  var sacha = Meteor.users.findOne(sachaId);


  Posts.insert({
    title: 'Farenheit 451',
    author: 'Ray Bradbury',
    comments: 'I really liked this book!',
    username: sacha.profile.name,
    userId: sacha._id,
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  Posts.insert({
    title: "Ender's Game",
    author: 'Orson Scott Card',
    comments: 'Good condition',
    username: sacha.profile.name,
    userId: sacha._id,
    submitted: new Date(now - 3 * 3600 * 1000)
  });

  var discovering = Posts.insert({
    title: 'Discovering Meteor',
    author: 'Tom Coleman & Sacha Greif',
    comments: '',
    username: tom.profile.name,
    userId: tom._id,
    submitted: new Date(now - 10 * 3600 * 1000)
  });
  var request = {
    user:sacha.profile.name,
    status: 'accepted',
    messages: {

    },
  }
  var postProperties = _.extend(Posts.findOne(discovering._id), request);
  Posts.update(discovering._id, {$set: postProperties}, function(error) {
    if (error) {
      // display the error to the user
      console.log(error.reason);
      alert(error.reason);
    }
  });
}
