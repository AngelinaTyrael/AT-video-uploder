import { UPLOAD_INFO, ALLOWED_TYPE, CHUNK_SIZE } from './config'

;((doc) => {
  const oProgress = doc.querySelector('#uploadProgress');
  const oUploader = doc.querySelector('#videoUploader');
  const oInfo = doc.querySelector('#uploadInfo');
  const oBtn = doc.querySelector('#uploadBtn');

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oBtn.addEventListener('click', uploadVideo, false)
  }

  function uploadVideo() {
    const {files: [file]} = oUploader;
    console.log(file)
    if (!file) {
      oInfo.innerText = UPLOAD_INFO['NO_FILE'];
    }

    if (!ALLOWED_TYPE[file.type]) {
      oInfo.innerText = UPLOAD_INFO['INVALID_TYPE'];
      return;
    }

    const { size, name, type } = file;
    const fileName = new Date().getTime() + '_' + name;
    oProgress.max = size;
    oInfo.innerText = '';
  }

  init();
})(document);
