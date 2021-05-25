/* global data */
/* exported data */
var $entryPhotoUrl = document.querySelector('#entryPhotoUrl');
var $entryTitle = document.querySelector('#entryTitle');
var $entryNotes = document.querySelector('#entryNotes');

var $img = document.querySelector('img');
var $entryForm = document.querySelector('.inputForm');
var $entryList = document.querySelector('.entryList');

// var $a = document.querySelectorAll('a');

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

  var h1Tag = document.createElement('h1');
  h1Tag.textContent = entryObject.title;
  divArchivedTitle.appendChild(h1Tag);

  var divArchivedNotes = document.createElement('div');
  divArchivedNotes.className = 'archived-notes';
  divColumnSecond.appendChild(divArchivedNotes);

  var pTag = document.createElement('p');
  pTag.textContent = entryObject.text;
  divArchivedNotes.appendChild(pTag);

  return divList;
}

var unorderedList = document.querySelector('ul');

function domLoop(event) {
  var currentEntries = data.entries;
  for (var a = 0; a < currentEntries.length; a++) {
    var currentEntry = entryCreateDom(currentEntries[a]);
    unorderedList.appendChild(currentEntry);
  }
}

document.addEventListener('DOMContentLoaded', domLoop);

// var testObj = {
//   title: 'test title',
//   text: 'test text goes here',
//   url: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2019/12/03202400/Yellow-Labrador-Retriever.jpg'
// };
// entryCreateDom(testObj);

// function openEntriesView(event){

// }

function changeView(event) {
  var currentEvent = event.target;
  if (currentEvent.matches('a')) {
    // console.log('a clicked!');
    // console.log('$a', $a);
    // console.log('event.target.tagName:', event.target.tagName)
    if (currentEvent.className === 'e-tab') {
      // console.log('a class!');
      $entryList.className = 'entryList';
      $entryForm.className = 'inputForm hidden';
    }
    if (currentEvent.className === 'new-button') {
      // console.log('button clicked!');
      $entryList.className = 'entryList hidden';
      $entryForm.className = 'inputForm';
    }

    // if (currentEvent.className === 'e-tab'){
    //   console.log('a class!');
    //   $entryList.className = 'entryList';
    //   $entryForm.className = 'inputForm hidden';
    // }
    // if (currentEvent.className === 'new-button'){
    //   console.log('button clicked!');
    //   $entryList.className = 'entryList hidden';
    //   $entryForm.className = 'inputForm';
    // }

  }
}

// var entriesTab = document.querySelector('.entries-tab');
// entriesTab.addEventListener('click', openEntriesView);

var container = document.querySelector('.container');
container.addEventListener('click', changeView);

// $a.addEventListener('hover', function(){
//   console.log('a tag hovered');
// })
