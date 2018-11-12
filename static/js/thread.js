var thread = {};

thread.init = function() {

  if (typeof (DISABLE_JS) !== 'undefined' && DISABLE_JS) {
    return;
  }

  api.hiddenCaptcha = !document.getElementById('captchaDiv');

  document.getElementById('mainPanel').onscroll = function() {

    if (!thread.unreadPosts) {
      return;
    }

    var rect = thread.lastPost.getBoundingClientRect();

    if (rect.bottom < window.innerHeight) {
      thread.unreadPosts = 0;

      document.title = thread.originalTitle;
    }

  };

  api.boardUri = document.getElementById('boardIdentifier').value;
  thread.divPosts = document.getElementsByClassName('divPosts')[0];

  thread.initThread();

  document.getElementsByClassName('divRefresh')[0].style.display = 'block';

  thread.messageLimit = +document.getElementById('labelMessageLength').innerHTML;
  thread.refreshLabel = document.getElementById('labelRefresh');

  thread.refreshButton = document.getElementById('refreshButton');

  if (document.getElementById('controlThreadIdentifier')) {
    document.getElementById('settingsJsButon').style.display = 'inline';
    document.getElementById('settingsFormButon').style.display = 'none';

    if (document.getElementById('ipDeletionForm')) {
      document.getElementById('deleteFromIpJsButton').style.display = 'inline';

      document.getElementById('deleteFromIpFormButton').style.display = 'none';
    }

    if (document.getElementById('formTransfer')) {
      document.getElementById('transferJsButton').style.display = 'inline';

      document.getElementById('transferFormButton').style.display = 'none';
    }

  }

  thread.replyButton = document.getElementById('jsButton');
  thread.replyButton.style.display = 'inline';
  thread.replyButton.disabled = false;

  document.getElementById('formButton').style.display = 'none';

  var replies = document.getElementsByClassName('postCell');

  if (replies && replies.length) {
    thread.lastReplyId = replies[replies.length - 1].id;
  }

  thread.changeRefresh();

  var postingQuotes = document.getElementsByClassName('linkQuote');

  for (var i = 0; i < postingQuotes.length; i++) {
    processPostingQuote(postingQuotes[i]);
  }

  var ids = document.getElementsByClassName('labelId');

  for (i = 0; i < ids.length; i++) {
    processIdLabel(ids[i]);
  }
};

thread.initThread = function() {

  thread.lastReplyId = 0;
  thread.originalTitle = document.title;
  thread.highLightedIds = [];
  thread.idsRelation = {};
  thread.unreadPosts = 0;
  api.threadId = +document.getElementsByClassName('opCell')[0].id;
  thread.refreshURL = document.getElementById('divMod') ? '/mod.js?boardUri='
      + api.boardUri + '&threadId=' + api.threadId + '&json=1' : '/'
      + api.boardUri + '/res/' + api.threadId + '.json';

};

thread.applyBans = function(captcha) {

  var typedReason = document.getElementById('reportFieldReason').value.trim();
  var typedDuration = document.getElementById('fieldDuration').value.trim();
  var typedMessage = document.getElementById('fieldbanMessage').value.trim();
  var banType = document.getElementById('comboBoxBanTypes').selectedIndex;

  var toBan = posting.getSelectedContent();

  api.apiRequest('banUsers', {
    reason : typedReason,
    captcha : captcha,
    banType : banType,
    duration : typedDuration,
    banMessage : typedMessage,
    global : document.getElementById('checkboxGlobal').checked,
    postings : toBan
  }, function requestComplete(status, data) {

    if (status === 'ok') {

      alert('Bans applied');

    } else {
      alert(status + ': ' + JSON.stringify(data));
    }
  });
};

thread.banPosts = function() {

  if (!document.getElementsByClassName('panelRange').length) {
    posting.applyBans();
    return;
  }

  var typedCaptcha = document.getElementById('fieldCaptchaReport').value.trim();

  if (typedCaptcha && /\W/.test(typedCaptcha)) {
    alert('Invalid captcha.');
    return;
  }

  if (typedCaptcha.length == 24 || !typedCaptcha) {
    posting.applyBans(typedCaptcha);
  } else {
    var parsedCookies = api.getCookies();

    api.apiRequest('solveCaptcha', {
      captchaId : parsedCookies.captchaid,
      answer : typedCaptcha
    }, function solvedCaptcha(status, data) {
      posting.applyBans(parsedCookies.captchaid);
    });
  }

};

function processIdLabel(label) {

  var id = label.innerHTML;

  var array = thread.idsRelation[id] || [];
  thread.idsRelation[id] = array;

  var cell = label.parentNode.parentNode.parentNode;

  array.push(cell);

  label.onmouseover = function() {
    label.innerHTML = id + ' (' + array.length + ')';
  }

  label.onmouseout = function() {
    label.innerHTML = id;
  }

  label.onclick = function() {

    var index = thread.highLightedIds.indexOf(id);

    if (index > -1) {
      thread.highLightedIds.splice(index, 1);
    } else {
      thread.highLightedIds.push(id);
    }

    for (var i = 0; i < array.length; i++) {
      var cellToChange = array[i];

      if (cellToChange.className === 'innerOP') {
        continue;
      }

      cellToChange.className = index > -1 ? 'innerPost' : 'markedPost';
    }

  };

}

function transfer() {

  var informedBoard = document.getElementById("fieldDestinationBoard").value
      .trim();

  var originThread = document.getElementById("transferThreadIdentifier").value;
  var originBoard = document.getElementById("transferBoardIdentifier").value;

  api.apiRequest('transferThread', {
    boardUri : api.boardUri,
    threadId : api.threadId,
    boardUriDestination : informedBoard
  }, function setLock(status, data) {

    if (status === 'ok') {

      alert('Thread moved.');

      var redirect = '/' + informedBoard + '/res/';

      window.location.pathname = redirect + data + '.html';

    } else {
      alert(status + ': ' + JSON.stringify(data));
    }
  });

}

function markPost(id) {

  if (isNaN(id)) {
    return;
  }

  if (thread.markedPosting && thread.markedPosting.className === 'markedPost') {
    thread.markedPosting.className = 'innerPost';
  }

  var container = document.getElementById(id);

  if (!container || container.className !== 'postCell') {
    return;
  }

  thread.markedPosting = container.getElementsByClassName('innerPost')[0];

  if (thread.markedPosting) {
    thread.markedPosting.className = 'markedPost';
  }
}

function processPostingQuote(link) {

  link.onclick = function() {
    var toQuote = link.href.match(/#q(\d+)/)[1];

    qr.showQr(link, toQuote);

    document.getElementById('fieldMessage').value += '>>' + toQuote + '\n';

  };

}

function saveThreadSettings() {

  api.apiRequest('changeThreadSettings', {
    boardUri : api.boardUri,
    threadId : api.threadId,
    pin : document.getElementById('checkboxPin').checked,
    lock : document.getElementById('checkboxLock').checked,
    cyclic : document.getElementById('checkboxCyclic').checked
  }, function setLock(status, data) {

    if (status === 'ok') {

      alert('Settings saved.');

      location.reload(true);

    } else {
      alert(status + ': ' + JSON.stringify(data));
    }
  });

}

var replyCallback = function(status, data) {

  if (status === 'ok') {

    postCommon.storeUsedPostingPassword(api.boardUri, api.threadId, data);

    document.getElementById('fieldMessage').value = '';
    document.getElementById('fieldSubject').value = '';
    qr.clearQRAfterPosting();
    postCommon.clearSelectedFiles();

    refreshPosts(true);

  } else {
    alert(status + ': ' + JSON.stringify(data));
  }
};

replyCallback.stop = function() {
  thread.replyButton.innerHTML = thread.originalButtonText;

  qr.setQRReplyText(thread.originalButtonText);

  thread.replyButton.disabled = false;
  qr.setQRReplyEnabled(true);
};

replyCallback.progress = function(info) {

  if (info.lengthComputable) {
    var newText = 'Uploading ' + Math.floor((info.loaded / info.total) * 100)
        + '%';
    thread.replyButton.innerHTML = newText;

    qr.setQRReplyText(newText);
  }
};

var refreshCallback = function(error, data) {

  if (error) {
    return;
  }

  if (thread.fullRefresh) {
    thread.lastReplyId = 0;
    thread.unreadPosts = 0;
    while (thread.divPosts.firstChild) {
      thread.divPosts.removeChild(thread.divPosts.firstChild);
    }

    document.title = thread.originalTitle;

  }

  var receivedData = JSON.parse(data);

  var posts = receivedData.posts;

  var foundPosts = false;

  if (posts && posts.length) {
    var lastReceivedPost = posts[posts.length - 1];

    if (lastReceivedPost.postId > thread.lastReplyId) {
      foundPosts = true;

      for (var i = 0; i < posts.length; i++) {

        var post = posts[i];

        if (post.postId > thread.lastReplyId) {
          thread.unreadPosts++;

          var postCell = posting.addPost(post, api.boardUri, api.threadId);

          thread.divPosts.appendChild(postCell);

          thread.lastPost = postCell;

          thread.lastReplyId = post.postId;
        }

      }

      if (!thread.fullRefresh) {
        document.title = '(' + thread.unreadPosts + ') ' + thread.originalTitle;
      }

    }
  }

  if (thread.autoRefresh) {
    startTimer(thread.manualRefresh || foundPosts ? 5 : thread.lastRefresh * 2);
  }

};

refreshCallback.stop = function() {

  thread.refreshButton.disabled = false;

  thread.refreshingThread = false;

  if (sideCatalog.waitingForRefreshData) {
    sideCatalog.loadThread(sideCatalog.waitingForRefreshData.cell,
        sideCatalog.waitingForRefreshData.thread);
    delete sideCatalog.waitingForRefreshData;
  }

};

function refreshPosts(manual, full) {

  if (manual && sideCatalog.loadingThread) {
    return;
  }

  thread.manualRefresh = manual;
  thread.fullRefresh = full;

  if (thread.autoRefresh && manual) {
    clearInterval(thread.refreshTimer);
  }

  thread.refreshButton.disabled = true;

  thread.refreshingThread = true;

  api.localRequest(thread.refreshURL, refreshCallback);

}

function sendReplyData(files, captchaId) {

  var forcedAnon = !document.getElementById('fieldName');
  var hiddenFlags = !document.getElementById('flagsDiv');

  if (!hiddenFlags) {
    var combo = document.getElementById('flagCombobox');

    var selectedFlag = combo.options[combo.selectedIndex].value;

    postCommon.savedSelectedFlag(selectedFlag);

  }

  if (!forcedAnon) {
    var typedName = document.getElementById('fieldName').value.trim();
    localStorage.setItem('name', typedName);
  }

  var typedEmail = document.getElementById('fieldEmail').value.trim();
  var typedMessage = document.getElementById('fieldMessage').value.trim();
  var typedSubject = document.getElementById('fieldSubject').value.trim();
  var typedPassword = document.getElementById('fieldPostingPassword').value
      .trim();

  if (!typedMessage.length && !files.length) {
    alert('A message or a file is mandatory.');
    return;
  } else if (!forcedAnon && typedName.length > 32) {
    alert('Name is too long, keep it under 32 characters.');
    return;
  } else if (typedMessage.length > thread.messageLimit) {
    alert('Message is too long, keep it under ' + thread.messageLimit
        + ' characters.');
    return;
  } else if (typedEmail.length > 64) {
    alert('E-mail is too long, keep it under 64 characters.');
    return;
  } else if (typedSubject.length > 128) {
    alert('Subject is too long, keep it under 128 characters.');
    return;
  } else if (typedPassword.length > 8) {
    alert('Password is too long, keep it under 8 characters.');
    return;
  }

  if (!typedPassword) {
    typedPassword = Math.random().toString(36).substring(2, 10);
  }

  localStorage.setItem('deletionPassword', typedPassword);

  var spoilerCheckBox = document.getElementById('checkboxSpoiler');

  var noFlagCheckBox = document.getElementById('checkboxNoFlag');

  thread.originalButtonText = thread.replyButton.innerHTML;
  thread.replyButton.innerHTML = 'Uploading 0%';
  qr.setQRReplyText(thread.replyButton.innerHTML);
  thread.replyButton.disabled = true;
  qr.setQRReplyEnabled(false);

  api.apiRequest('replyThread', {
    name : forcedAnon ? null : typedName,
    flag : hiddenFlags ? null : selectedFlag,
    captcha : captchaId,
    subject : typedSubject,
    noFlag : noFlagCheckBox ? noFlagCheckBox.checked : false,
    spoiler : spoilerCheckBox ? spoilerCheckBox.checked : false,
    password : typedPassword,
    message : typedMessage,
    email : typedEmail,
    files : files,
    boardUri : api.boardUri,
    threadId : api.threadId
  }, replyCallback);

}

function processFilesToPost(captchaId) {

  postCommon.getFilestToUpload(function gotFiles(files) {
    sendReplyData(files, captchaId);
  });

}

function processReplyRequest() {

  if (api.hiddenCaptcha) {
    processFilesToPost();
  } else {
    var typedCaptcha = document.getElementById('fieldCaptcha').value.trim();

    if (typedCaptcha.length !== 6 && typedCaptcha.length !== 24) {
      alert('Captchas are exactly 6 (24 if no cookies) characters long.');
      return;
    } else if (/\W/.test(typedCaptcha)) {
      alert('Invalid captcha.');
      return;
    }

    if (typedCaptcha.length == 24) {
      processFilesToPost(typedCaptcha);
    } else {
      var parsedCookies = api.getCookies();

      api.apiRequest('solveCaptcha', {

        captchaId : parsedCookies.captchaid,
        answer : typedCaptcha
      }, function solvedCaptcha(status, data) {
        processFilesToPost(parsedCookies.captchaid);
      });
    }

  }

}

function postReply() {

  api.localRequest('/blockBypass.js?json=1',
      function checked(error, response) {

        if (error) {
          alert(error);
          return;
        }

        var data = JSON.parse(response);

        var alwaysUseBypass = document
            .getElementById('alwaysUseBypassCheckBox').checked;

        if (!data.valid
            && (data.mode == 2 || (data.mode == 1 && alwaysUseBypass))) {

          postCommon.displayBlockBypassPrompt(function() {
            processReplyRequest();
          });

        } else {
          processReplyRequest();
        }

      });

}

function startTimer(time) {

  if (time > 600) {
    time = 600;
  }

  thread.currentRefresh = time;
  thread.lastRefresh = time;
  thread.refreshLabel.innerHTML = thread.currentRefresh;
  thread.refreshTimer = setInterval(function checkTimer() {

    if (sideCatalog.loadingThread) {
      return;
    }

    thread.currentRefresh--;

    if (!thread.currentRefresh) {
      clearInterval(thread.refreshTimer);
      refreshPosts();
      thread.refreshLabel.innerHTML = '';
    } else {
      thread.refreshLabel.innerHTML = thread.currentRefresh;
    }

  }, 1000);
}

thread.changeRefresh = function() {

  thread.autoRefresh = document.getElementById('checkboxChangeRefresh').checked;

  if (!thread.autoRefresh) {
    thread.refreshLabel.innerHTML = '';
    clearInterval(thread.refreshTimer);
  } else {
    startTimer(5);
  }

};

thread.deleteFromIp = function() {

  var typedIp = document.getElementById('ipField').value.trim();
  var typedBoards = document.getElementById('fieldBoards').value.trim();

  if (!typedIp.length) {
    alert('An ip is mandatory');
    return;
  }

  api.apiRequest('deleteFromIp', {
    ip : typedIp,
    boards : typedBoards
  }, function requestComplete(status, data) {

    if (status === 'ok') {

      document.getElementById('ipField').value = '';
      document.getElementById('fieldBoards').value = '';

      alert('Postings deleted.');

    } else {
      alert(status + ': ' + JSON.stringify(data));
    }
  });

};

thread.init();
