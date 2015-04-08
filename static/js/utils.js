/* Set up */
var socket = io.connect(location.host);
toastr.options = {
  closeButton : true,
  debug : false,
  progressBar: true,
  positionClass: 'toast-bottom-right',
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '10000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

/* Helper function */
var notify = function(success, error, stat) {
  if (stat === null) {
    toastr.success(success);
  } else {
    if (stat !== false) {
      toastr.error(error + stat);
    } else {
      toastr.error(error + 'Unknown Error');
    }
  }
};

$(document).ready(function() {
  /* UI Configuration */
  $('#whobox')
    .modal({
      closable : false
    })
    .modal('show')
  ;

  /*
  setInterval(function() {
    $('#chatter').scrollTop($('#chatter').scrollTop() + 10);
  }, 10);
  */
  
  $('#name_btn').on('click', function(){
    name = $('#username').val();
    $('#whobox').modal('hide');
    return false;
  });

  $('#send_btn').on('click', function(){
    var msgStr = $('#m').val();
    socket.emit('chat_msg', { name: name, msg: msgStr });
    console.log('Message sent: ' + msgStr);	
    $('#m').val('');
    return false;
  });

  var uploader = new Dropzone('#dropzone', {
    url : '/upload',
    maxFilesize : 25
  });

  uploader.on('complete', function(file) {
    uploader.removeFile(file);
  });

  uploader.on('error', function(file) {
    notify('', 'Failed to upload ' + file.name, '. It may be over 25MB');
  });

  uploader.on('success', function(file) {
    notify('Successfully uploaded ' + file.name, '', null);
  });
});
