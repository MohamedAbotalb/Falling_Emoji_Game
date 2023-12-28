export const showPopup = (object) => {
  const { message, img, imgAlt, showConfirmButton, timer } = object;
  Swal.fire({
    title: message,
    imageUrl: img,
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: imgAlt,
    showConfirmButton: showConfirmButton,
    timer: timer,
  });
};
