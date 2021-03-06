/* global data */
/* exported data */
var $entryPhotoUrl = document.querySelector('#entryPhotoUrl');
var $entryTitle = document.querySelector('#entryTitle');
var $entryNotes = document.querySelector('#entryNotes');

var $img = document.querySelector('img');
var $entryForm = document.querySelector('.inputForm');
var $entryList = document.querySelector('.entryList');

var unorderedList = document.querySelector('ul');

var $titleNewEntry = document.querySelector('.title-newEntry');
var $titleEditing = document.querySelector('.title-editing');
var $lastRow = document.querySelector('.last');
var $deleteLink = document.querySelector('.deleteLink');

var $modal = document.querySelector('.modal');
var $modalContent = document.querySelector('.modal-content');

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

function checkEntryTitleStatus() {
  if (data.editing === null) {
    $titleNewEntry.className = 'title-newEntry';
    $titleEditing.className = 'title-editing hidden';

    $lastRow.className = 'row last onlySave';
    $deleteLink.className = 'deleteLink hidden';
  } else {
    $titleNewEntry.className = 'title-newEntry hidden';
    $titleEditing.className = 'title-editing';

    $lastRow.className = 'row last both';
    $deleteLink.className = 'deleteLink';
  }
}

function updateSrc(event) {
  var userUrl = $entryPhotoUrl.value;
  $img.setAttribute('src', userUrl);
}

function saveButton(event) {
  event.preventDefault();
  var inputValues = {};

  if (data.editing === null) {
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
  } else {
    var spliceIndex;
    var id = Number(data.editing);

    for (var a = 0; a < data.entries.length; a++) {
      var currentA = {};
      currentA = data.entries[a];
      var currentId = Number(currentA.dataEntryId);
      if (id === currentId) {
        spliceIndex = a;
      }
    }

    data.entries.splice(spliceIndex, 1);

    inputValues.title = $entryTitle.value;
    inputValues.text = $entryNotes.value;
    inputValues.url = $entryPhotoUrl.value;
    inputValues.dataEntryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(inputValues);

    document.querySelector('form').reset();
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');

    unorderedList.replaceChildren();
    domLoop(event);

    data.view = 'entries';
    $entryList.className = 'entryList';
    $entryForm.className = 'inputForm hidden';

    data.editing = null;
  }
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

  var spanTitle = document.createElement('span');
  spanTitle.textContent = entryObject.title;
  spanTitle.className = 'archived-title-span';
  divArchivedTitle.appendChild(spanTitle);

  var spanEditIcon = document.createElement('span');
  divArchivedTitle.appendChild(spanEditIcon);

  var iEditIcon = document.createElement('i');
  iEditIcon.className = 'fas fa-edit';
  iEditIcon.setAttribute('entryNumber', entryObject.dataEntryId);
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

    if (currentEvent.className === 'new-button') {
      data.view = 'entry-form';
      $entryList.className = 'entryList hidden';
      $entryForm.className = 'inputForm';

      checkEntryTitleStatus();

      $entryNotes.value = '';
      $entryTitle.value = '';
      $entryPhotoUrl.value = '';
      $img.setAttribute('src', 'images/placeholder-image-square.jpg');

      data.editing = null;
    }
    if (currentEvent.className === 'e-tab') {
      data.view = 'entries';
      $entryList.className = 'entryList';
      $entryForm.className = 'inputForm hidden';

      data.editing = null;
    }

    if (currentEvent.className === 'deleteAnchor') {
      $modal.className = 'modal';
      $modalContent.className = 'modal-content';
    }

    if (currentEvent.className === 'cancel-button') {
      $modal.className = 'modal hidden';
      $modalContent.className = 'modal-content hidden';
    }

    if (currentEvent.className === 'confirm-button') {
      var spliceInd;
      var idVal = Number(data.editing);

      for (var b = 0; b < data.entries.length; b++) {
        var currentB = {};
        currentB = data.entries[b];
        var currentIdVal = Number(currentB.dataEntryId);
        if (idVal === currentIdVal) {
          spliceInd = b;
        }
      }

      data.entries.splice(spliceInd, 1);

      unorderedList.replaceChildren();
      domLoop(event);

      $modal.className = 'modal hidden';
      $modalContent.className = 'modal-content hidden';

      data.view = 'entries';
      $entryList.className = 'entryList';
      $entryForm.className = 'inputForm hidden';

      data.editing = null;
    }

  }
  if (currentEvent.matches('i')) {
    var currentObjectNum = String(currentEvent.getAttribute('entryNumber'));

    data.editing = currentObjectNum;
    var currentObject = {};

    for (var i = 0; i < data.entries.length; i++) {
      var currentI = {};

      currentI = data.entries[i];
      var currentDataId = String(currentI.dataEntryId);

      if (currentDataId === currentObjectNum) {
        currentObject = currentI;
        break;
      }
    }
    checkEntryTitleStatus();

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
