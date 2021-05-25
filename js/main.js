/* global data */
/* exported data */
// var inputValues = {};
var $entryPhotoUrl = document.querySelector('#entryPhotoUrl');
var $entryTitle = document.querySelector('#entryTitle');
var $entryNotes = document.querySelector('#entryNotes');

var $img = document.querySelector('img');
// console.log('$entryPhotoUrl:', $entryPhotoUrl);
// console.log('$img', $img);
var $entryForm = document.querySelector('.inputForm');
var myStorage = window.localStorage;

// var $entryForm = document.querySelector(".form");

function updateSrc(event) {
  // var userUrl = $entryForm.elements.url.value;
  var userUrl = $entryPhotoUrl.value;
  // console.log('current image url:', userUrl);
  $img.setAttribute('src', userUrl);
  // console.log('$img.src:', $img.src);

}

function saveButton(event) {
  // console.log('submitted!');
  event.preventDefault();
  var inputValues = {};

  inputValues.title = $entryTitle.value;
  inputValues.text = $entryNotes.value;
  inputValues.url = $entryPhotoUrl.value;
  inputValues.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(inputValues);

  var dataJson = JSON.stringify(data);

  myStorage.setItem('javascript-local-storage', dataJson);

  // console.log('submitted!');
  // console.log('input Values:', inputValues);
  // console.log('data', data);

  document.querySelector('form').reset();

}

$entryPhotoUrl.addEventListener('input', updateSrc);
$entryForm.addEventListener('submit', saveButton);
