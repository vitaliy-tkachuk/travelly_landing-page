/* eslint-disable no-alert */
/* eslint-disable func-names */

// your custom code goes below...
let $ = document.getElementById.bind(document);
$('doAlert').onclick = function() {
  $('time').textContent = new Date();
  alert('Alert !');
};
