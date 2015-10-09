Template.userPage.helpers({
  userPosts : function(){
    return Posts.find({userId:this._id})
  }
});
