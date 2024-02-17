function showImage(src) {
    var modal = document.getElementById("image-modal");
    var modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeImageModal() {
    var modal = document.getElementById("image-modal");
    modal.style.display = "none";
}