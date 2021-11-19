const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileFormFieldElement = document.querySelector('.ad-form__field input[type=file]');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
const fileFormUploadElement = document.querySelector('.ad-form__upload input[type=file]');
const previewPhotoElement = document.querySelector('.ad-form__photo');

fileFormFieldElement.addEventListener('change', () => {
  const file = fileFormFieldElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    previewAvatarElement.src = URL.createObjectURL(file);
  }
});

fileFormUploadElement.addEventListener('change', () => {
  const file = fileFormUploadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    previewPhotoElement.innerHTML = '<img src width="70" height="70" borderRadius="5">';
    const img = previewPhotoElement.querySelector('img');
    img.src = URL.createObjectURL(file);
  }
});


