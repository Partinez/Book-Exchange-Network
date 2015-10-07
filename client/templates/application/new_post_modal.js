Template.newPostModal.events({
  'click .openModal': function() {
    $('#modalView')
      .modal({
        onDeny    : function(){
          console.log('canceled')
          return false;
        },
        onApprove : function() {
          var modalInputValue = $('#modalInputValue').val();
          Session.set("formValue", modalInputValue);
        }
      })
      .modal('show')
    ;
  }
});
