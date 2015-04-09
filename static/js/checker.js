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

$.fn.sequenceEqual = function(compareTo) {
  if (!compareTo || !compareTo.length || this.length !== compareTo.length) {
    return false;
  }
  for (var i = 0, length = this.length; i < length; i++) {
    if (this[i] !== compareTo[i]) {
      return false;
    }
  }
  return true;
} 

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

var loadChallenges = function(challenges, next) {
  var x = 0;

  var nextChallenge = function() {
    console.log(challenges[x].text);
  };

  window.check = function() {
    try { 
      if (challenges[x].checker()) {
        x++;
        console.log('Correct! ' + x + ' of ' + challenges.length + ' complete.');
        console.log('\n');
        if (x == challenges.length) {
          console.log('Congratulations! You have completed all the challenges.');
          if (next) {
            console.log('Enter \'next()\' to move on to the next set of challenges');
          }
        } else {
          nextChallenge();
        }
      } else {
        console.log('Incorrect. Try again');
      }
    } catch(e) {
      console.log('Incorrect. Try again');
    }
  }

  window.next = function() {
    window.location = next;
  }

  console.log('You will be given a series of challenges. See if you can get them all.');
  console.log('Enter \'check()\' to check if you are correct');
  console.log('\n');

  nextChallenge();
};
