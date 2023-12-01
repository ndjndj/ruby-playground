function alertImage(event) {
    let img_upload = document.querySelector("#micropost_image")
    const size_in_megabytes = img_upload.files[0].size/1024/1024
    if (size_in_megabytes) {
        alert("Maximum file size is 5 MB. Please choose a smaller file")
        img_upload = "";
    }
}

document.addEventListener(
    "turbo:load", 
    function() {
        document.addEventListener(
            "change",
            alertImage,
        )
    }
)