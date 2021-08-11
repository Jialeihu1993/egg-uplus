'use strict';

// alert('hhh');
function login() {
  fetch('/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: 'admin',
      pwd: 'admin',
    }),
  }).then(res => {
    location.reload();
  });
}

function logout() {
  fetch('/logot', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
    }),
  }).then(res => {
    location.reload();
  });
}
