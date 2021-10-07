var preview = {}

preview.init = function() {

  if (!settings.get('previewOnHover')) {
    return;
  }

  preview.container = document.createElement('div');
  preview.container.id = 'previewContainer';
  preview.container.style.display = 'none';

  preview.img = document.createElement('img');
  preview.video = document.createElement('video');

  if (!settings.get('previewOnHoverSound')) {
    preview.video.muted = true;
  }
  preview.video.autoload = true;
  preview.video.loop = true;

  preview.container.appendChild(preview.img);
  preview.container.appendChild(preview.video);

  document.body.appendChild(preview.container);

  var imageLinks = document.querySelectorAll('.imgLink, .linkThumb');

  for (var i = 0; i < imageLinks.length; i++) {

    var link = imageLinks[i];

    link.onmouseenter = preview.show;
    link.onmouseleave = preview.remove;

  }

};

preview.show = function() {

  if (this.getElementsByClassName('imgExpanded').length > 0) {
    return;
  }

  var src = this.dataset.filepath ? this.dataset.filepath : this.href;
  var mime = this.dataset.filemime;

  if (mime === '') {
    return;
  }

  if (thumbs.playableTypes.indexOf(mime) > -1) {

    preview.img.style.display = 'none';
    preview.video.src = src;
    preview.video.style.display = 'inline-block';
    preview.video.play();
    preview.video.currentTime = 0;

  } else {

    preview.video.style.display = 'none';
    preview.img.src = src;
    preview.img.style.display = 'inline-block';

  }

  preview.container.style.display = 'block';

};

preview.remove = function() {

  preview.img.style.display = 'none';
  preview.video.style.display = 'none';
  preview.video.pause();
  preview.video.currentTime = 0;
  preview.img.removeAttribute('src');
  preview.video.removeAttribute('src');
  preview.container.style.display = 'none';

};

preview.init();
