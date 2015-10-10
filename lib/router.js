Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

AccountsTemplates.configure({
    defaultLayout: 'layout',
});

Router.route('/', {
  name: 'postsList'
});

Router.route('/submitpost', {
  name: 'postSubmit'
});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() {
    return Posts.findOne(this.params._id);
  },
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/user/:name', {
  name: 'userPage',
  waitOn: function() {
    return Meteor.subscribe('users', this.params.name);
  },
  data: function() {
    return Meteor.users.findOne({'profile.name' : this.params.name},{profile:1});
  },
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});



Router.plugin('ensureSignedIn', {
  only: ['private']
});


AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
