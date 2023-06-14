import { UPLOAD_INFO, ALLOWED_TYPE, CHUNK_SIZE, API  } from './config'

;((doc) => {
  const oProgress = doc.querySelector('#uploadProgress');
  const oUploader = doc.querySelector('#videoUploader');
  const oInfo = doc.querySelector('#uploadInfo');
  const oBtn = doc.querySelector('#uploadBtn');

  let uploadedSize = 0;

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oBtn.addEventListener('click', uploadVideo, false)
  }

  async function uploadVideo() {
    const {files: [file]} = oUploader;
    if (!file) {
      oInfo.innerText = UPLOAD_INFO['NO_FILE'];
    }

    if (!ALLOWED_TYPE[file.type]) {
      oInfo.innerText = UPLOAD_INFO['INVALID_TYPE'];
      return;
    }

    const { size, name, type } = file;
    const fileName = new Date().getTime() + '_' + name;
    let uploadedResult = null;
    oProgress.max = size;
    oInfo.innerText = '';

    while(uploadedSize < size) {
      const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE);
      const formData = createFormData({
        name,
        type,
        size,
        fileName,
        uploadedSize,
        file: fileChunk
      })
      try {
        uploadedResult = await axios.post(API.UPLOAD_VIDEO,  formData);
      }catch (e) {
        oInfo.innerText = `${UPLOAD_INFO['UPLOAD_FAILED']}(${e.message})`;
        return;
      }

      uploadedSize += fileChunk.size;
      oProgress.value = uploadedSize;
    }

    oInfo.innerText = UPLOAD_INFO['UPLOAD_SUCCESS'];
    oUploader.value = null;
  }

  function createFormData({
    name,
    type,
    size,
    fileName,
    uploadedSize,
    file
  }) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('type', type);
    fd.append('size', size);
    fd.append('fileName', fileName);
    fd.append('uploadedSize', uploadedSize);
    fd.append('file', file);

    return fd;
  }

  init();
})(document);
