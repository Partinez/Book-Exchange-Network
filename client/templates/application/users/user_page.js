Template.userPage.helpers({
  userPosts : function(){
    console.log(this);
    console.log(this._id);
    return Posts.find({userId:this._id})
  }
});
