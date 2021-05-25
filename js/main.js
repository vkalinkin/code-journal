/* global data */
/* exported data */
var $entryPhotoUrl = document.querySelector('#entryPhotoUrl');
var $entryTitle = document.querySelector('#entryTitle');
var $entryNotes = document.querySelector('#entryNotes');

var $img = document.querySelector('img');
var $entryForm = document.querySelector('.inputForm');

function updateSrc(event) {
  var userUrl = $entryPhotoUrl.value;
  $img.setAttribute('src', userUrl);

}

function saveButton(event) {
  event.preventDefault();
  var inputValues = {};

  inputValues.title = $entryTitle.value;
  inputValues.text = $entryNotes.value;
  inputValues.url = $entryPhotoUrl.value;
  inputValues.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(inputValues);

  document.querySelector('form').reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
}

$entryPhotoUrl.addEventListener('input', updateSrc);
$entryForm.addEventListener('submit', saveButton);
