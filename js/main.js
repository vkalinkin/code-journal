/* global data */
/* exported data */
var $entryPhotoUrl = document.querySelector('#entryPhotoUrl');
var $entryTitle = document.querySelector('#entryTitle');
var $entryNotes = document.querySelector('#entryNotes');

var $img = document.querySelector('img');
var $entryForm = document.querySelector('.inputForm');
var $entryList = document.querySelector('.entryList');

var unorderedList = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {
  checkViewStatus();
  domLoop(event);
});

function checkViewStatus() {
  if (data.view === 'entry-form') {
    $entryList.className = 'entryList hidden';
    $entryForm.className = 'inputForm';
  }
  if (data.view === 'entries') {
    $entryList.className = 'entryList';
    $entryForm.className = 'inputForm hidden';
  }
}

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
  inputValues.dataEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(inputValues);

  document.querySelector('form').reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  var topOfList = entryCreateDom(inputValues);
  unorderedList.prepend(topOfList);

  data.view = 'entries';
  $entryList.className = 'entryList';
  $entryForm.className = 'inputForm hidden';
}

$entryPhotoUrl.addEventListener('input', updateSrc);
$entryForm.addEventListener('submit', saveButton);

function entryCreateDom(entryObject) {
  var divList = document.createElement('li');

  var divRow = document.createElement('div');
  divRow.className = 'row';
  divList.appendChild(divRow);

  var divColumnFirst = document.createElement('div');
  divColumnFirst.className = 'column-half first';
  divRow.appendChild(divColumnFirst);

  var imgTag = document.createElement('img');
  imgTag.className = 'archived-image';
  imgTag.setAttribute('src', entryObject.url);
  divColumnFirst.appendChild(imgTag);

  var divColumnSecond = document.createElement('div');
  divColumnSecond.className = 'column-half second';
  divRow.appendChild(divColumnSecond);

  var divArchivedTitle = document.createElement('div');
  divArchivedTitle.className = 'archived-title';
  divColumnSecond.appendChild(divArchivedTitle);

  // var h1Tag = document.createElement('h1');
  // h1Tag.textContent = entryObject.title;
  // divArchivedTitle.appendChild(h1Tag);
  var spanTitle = document.createElement('span');
  spanTitle.textContent = entryObject.title;
  divArchivedTitle.appendChild(spanTitle);

  var spanEditIcon = document.createElement('span');
  // spanEditIcon.textContent = '<i class="fas fa-edit"></i>';
  divArchivedTitle.appendChild(spanEditIcon);

  // var aTag = document.createElement('a');
  // spanEditIcon.appendChild(aTag);

  var iEditIcon = document.createElement('i');
  iEditIcon.className = 'fas fa-edit';
  iEditIcon.setAttribute('entryNumber', entryObject.dataEntryId);
  // aTag.appendChild(iEditIcon);
  spanEditIcon.appendChild(iEditIcon);

  var divArchivedNotes = document.createElement('div');
  divArchivedNotes.className = 'archived-notes';
  divColumnSecond.appendChild(divArchivedNotes);

  var pTag = document.createElement('p');
  pTag.textContent = entryObject.text;
  divArchivedNotes.appendChild(pTag);

  return divList;
}

function domLoop(event) {
  var currentEntries = data.entries;
  for (var a = 0; a < currentEntries.length; a++) {
    var currentEntry = entryCreateDom(currentEntries[a]);
    unorderedList.appendChild(currentEntry);
  }
}

function changeView(event) {
  var currentEvent = event.target;
  if (currentEvent.matches('a')) {
    // console.log('a pressed!')

    if (currentEvent.className === 'new-button') {
      data.view = 'entry-form';
      $entryList.className = 'entryList hidden';
      $entryForm.className = 'inputForm';
    }
    if (currentEvent.className === 'e-tab') {
      data.view = 'entries';
      $entryList.className = 'entryList';
      $entryForm.className = 'inputForm hidden';
    }

  }
  if (currentEvent.matches('i')) {
    // console.log ('i pressed!');

    var currentObjectNum = String(currentEvent.getAttribute('entryNumber'));
    // console.log('currentObjectNum:', currentObjectNum);
    // if (currentEvent.matches('span')){
    //   console.log ('span pressed!');

    data.editing = currentObjectNum;
    var currentObject = {};

    for (var i = 0; i < data.entries.length; i++) {
      var currentI = {};

      currentI = data.entries[i];
      // console.log('currentI:', currentI);
      var currentDataId = String(currentI.dataEntryId);
      // console.log('current Data Id:', currentDataId)

      if (currentDataId === currentObjectNum) {
        currentObject = currentI;
        // console.log('MATCH');
        break;
      }
    }
    // console.log('current object:', currentObject);

    data.view = 'entry-form';
    $entryList.className = 'entryList hidden';
    $entryForm.className = 'inputForm';

    $entryNotes.value = currentObject.text;
    $entryTitle.value = currentObject.title;
    $entryPhotoUrl.value = currentObject.url;
    updateSrc(event);

  }

}

var container = document.querySelector('.container');
container.addEventListener('click', changeView);
