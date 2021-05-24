/* global data */
/* exported data */

var $entryPhotoUrl = document.querySelector('#entryPhotoUrl');
var $img = document.querySelector('img');
// console.log('$entryPhotoUrl:', $entryPhotoUrl);
// console.log('$img', $img);
// var $entryForm = document.querySelector()

// var $entryForm = document.querySelector(".form");

function updateSrc(event) {
  // var userUrl = $entryForm.elements.url.value;
  var userUrl = $entryPhotoUrl.value;
  // console.log('current image url:', userUrl);
  $img.setAttribute('src', userUrl);
  // console.log('$img.src:', $img.src);

}

$entryPhotoUrl.addEventListener('input', updateSrc);
