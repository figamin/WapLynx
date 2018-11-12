var loginObj = {};
// I wish I could go back in time and kill whoever implemented the exposed
// element bullshit on IE before he was born

loginObj.init = function() {

  if (typeof (DISABLE_JS) !== 'undefined' && DISABLE_JS) {
    return;
  }

  if (document.getElementById('divCreation')) {
    document.getElementById('registerJsButton').style.display = 'inline';
    document.getElementById('registerFormButton').style.display = 'none';
  }

  document.getElementById('loginJsButton').style.display = 'inline';
  document.getElementById('recoverJsButton').style.display = 'inline';

  document.getElementById('recoverFormButton').style.display = 'none';
  document.getElementById('loginFormButton').style.display = 'none';

};

loginObj.recoverAccount = function() {

  var typedLogin = document.getElementById('recoverFieldLogin').value.trim();
  var typedCaptcha = document.getElementById('fieldCaptchaRecover').value
      .trim();

  if (typedCaptcha.length !== 6 && typedCaptcha.length !== 24) {
    alert('Captchas are exactly 6 (24 if no cookies) characters long.');

  } else if (/\W/.test(typedCaptcha)) {
    alert('Invalid captcha.');

  } else if (typedLogin.length) {

    api.apiRequest('requestAccountRecovery', {
      login : typedLogin,
      captcha : typedCaptcha
    }, function requestComplete(status, data) {

      if (status === 'ok') {

        alert('Password request created. Check your e-mail.');

      } else {
        alert(status + ': ' + JSON.stringify(data));
      }
    });

  }

};

loginObj.loginUser = function() {

  var typedLogin = document.getElementById('loginFieldLogin').value.trim();
  var typedPassword = document.getElementById('loginFieldPassword').value;

  if (!typedLogin.length || !typedPassword.length) {
    alert('Both login and password are mandatory.');
  } else {
    api.apiRequest('login', {
      login : typedLogin,
      password : typedPassword,
      remember : document.getElementById('checkboxRemember').checked
    }, function requestComplete(status, data) {

      if (status === 'ok') {

        var expiration = new Date();
        expiration.setUTCFullYear(expiration.getUTCFullYear() + 1);

        document.cookie = 'login=' + typedLogin + '; path=/; expires='
            + expiration.toUTCString();

        window.location.pathname = '/account.js';

      } else {
        alert(status + ': ' + JSON.stringify(data));
      }
    });
  }

};

loginObj.registerAccount = function() {

  var typedLogin = document.getElementById('registerFieldLogin').value.trim();
  var typedEmail = document.getElementById('registerFieldEmail').value.trim();
  var typedPassword = document.getElementById('registerFieldPassword').value;
  var typedCaptcha = document.getElementById('fieldCaptcha').value.trim();

  if (!typedLogin.length || !typedPassword.length) {
    alert('Both login and password are mandatory.');
  } else if (typedLogin.length > 16) {
    alert('Login too long, keep it under 16 characters.');
  } else if (typedEmail.length > 64) {
    alert('E-mail too long, keep it under 64 characters.');
  } else if (typedCaptcha.length !== 6 && typedCaptcha.length !== 24) {
    alert('Captchas are exactly 6 (24 if no cookies) characters long.');
    return;
  } else if (/\W/.test(typedCaptcha)) {
    alert('Invalid captcha.');
    return;
  } else if (/\W/.test(typedLogin)) {
    alert('Invalid login.');
  } else {

    api.apiRequest('registerAccount', {
      login : typedLogin,
      captcha : typedCaptcha,
      password : typedPassword,
      email : typedEmail
    }, function requestComplete(status, data) {

      if (status === 'ok') {

        var expiration = new Date();
        expiration.setUTCFullYear(expiration.getUTCFullYear() + 1);

        document.cookie = 'login=' + typedLogin + '; path=/; expires='
            + expiration.toUTCString();

        window.location.pathname = '/account.js';

      } else {
        alert(status + ': ' + JSON.stringify(data));
      }
    });

  }

};

loginObj.init();