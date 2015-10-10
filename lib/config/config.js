var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      $('#logInModal').modal('hide');
    }
    if (state === "signUp") {
      // Successfully registered
      $('#logInModal').modal('hide');
    }
  }
};

// var addProfile = function(error, info){
//   if (!error) {
//     _.extend(info.profile, {
//       username: info.username,
//     });
//
//   }
// }




AccountsTemplates.configure({
  onSubmitHook: mySubmitFunc,
  enablePasswordChange: true,
  showForgotPasswordLink: true,
//  preSignUpHook: addProfile,
  lowercaseUsername: true,
  showValidating: true,
})

if (Meteor.isServer){
    Meteor.methods({
        "userExists": function(username){
            return !!Meteor.users.findOne({username: username});
        },
    });
}
AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    re: /(?=.*[^\s]).{4,12}/,
    errStr: "Min 4 chars, max 10. No spaces are allowed",
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    }
});

AccountsTemplates.removeField('email');
AccountsTemplates.addField({
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
  },
);

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
});
