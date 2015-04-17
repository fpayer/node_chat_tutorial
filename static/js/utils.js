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
var name = '';

/* Helper functions */
/*
 * Creates a positive or negative toast notification depending on the status provided
*/
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

/*
 * Generates a random number between the interval (inclusive)
*/
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var utils = new (function() {
  var populate_funcs = {
    /*
     * Populates user list
    */
    users : function(data) {
      //Remove old user list
      $('#user-list').empty();

      //Add new users
      var x = 0;
      while (x < data.length) {
        $('#user-list').append(
          $('<div>').addClass('item').text(data[x])
        );
        x++;
      }
    },
    /*
     * Adds message to chat body
    */
    message : function(data) {
     //Add message to body
      $('#messages').append(
        $('<tr>').append(
          $('<td>').text(data.name + ': ' + data.message)
        )
      );
      //Scroll chat window
      $("#chatter").animate({ scrollTop: $('#chatter').prop('scrollHeight')}, 50);     
    },
    /*
     * Adds file download link to chat body
    */
    upload : function(data) {
      $('#messages')
        .append($('<tr>')
          .append($('<td>')
            .append($('<div>')
              .append($('<span>')
                .text('A user has uploaded ')
              )
              .append($('<a>')
                .text(data.filename)
                .attr('href', data.url)
                .attr('target', '_blank')
              )
            )
          )
        )
      ;
      //Scroll chat window
      $("#chatter").animate({ scrollTop: $('#chatter').prop('scrollHeight')}, 50);     
    }
  };

  return {
    populate : function(val, data) {
      populate_funcs[val](data);
    },
  }
});
  
/* Socket Configuration */
socket.on('message', function(data) {
  utils.populate('message',data); 
});

socket.on('users', function(data) {
  utils.populate('users', data);
});

socket.on('upload', function(data) {
  utils.populate('upload', data);
});

/* UI Configuration */
$(document).ready(function() {
  //Create popup to ask for name
  $('#name-modal')
    .modal({
      closable : false,
      onShow : function() {
        $('#name-input').focus();
      }
    })
    .modal('show')
  ;

  //Submit name on enter
  $('#name-input').on('keyup', function(e) {
    if (e.keyCode === 13) {
      /* 
       * TODO
       * Grab user name, check if it is empty, set global name, and then emit it via socket.io
      */
      $('#name-modal').modal('hide');
    }
  });
  
  //Submit name on button press
  $('#name-btn').on('click', function() {
    /* 
     * TODO
     * Grab user name, check if it is empty, set global name, and then emit it via socket.io
    */
    $('#name-modal').modal('hide');
  });

  //Submit message on enter
  $('#message-input').on('keyup', function(e) {
    /*
     * TODO
     * Grab message, check if it is empty and then emit it via socket.io
     */
  });
  
  //Submit message on button press
  $('#message-btn').on('click', function() {
    /*
     * TODO
     * Grab message, check if it is empty and then emit it via socket.io
     */
  });

  //Handles file uploads
  var uploader = new Dropzone('#dropzone', {
    url : '/upload',
    maxFilesize : 25
  }).on('complete', function(file) {
    uploader.removeFile(file);
  }).on('error', function(file) {
    notify('', 'Failed to upload ' + file.name, '. It may be over 25MB');
  }).on('success', function(file) {
    notify('Successfully uploaded ' + file.name, '', null);
  });
});
