Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});

Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) {
    return ownsDocument(userId, post);
  },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'author', 'title', 'comments').length > 0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      author: String,
      comments: String
    });
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      username: user.profile.name,
      submitted: new Date()
    });
     var errors = validatePost(postAttributes);
     if (errors.title || errors.author)   {
       throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
     }

    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});

validatePost = function (post) {
  var errors = {};
  if (!post.title) {
    errors.title = true;
  }
  if (!post.author) {
    errors.author = true;
  }
return errors;
}
