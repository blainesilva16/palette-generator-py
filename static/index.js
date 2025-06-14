const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const removeBtn = document.getElementById("remove-btn");
const colorInfo = document.getElementById("color-info");
const colorDetails = document.getElementById("color-details");
const clickInstruction = document.getElementById("click-instruction");
const hexSpan = document.getElementById("hex-code");
const rgbSpan = document.getElementById("rgb-code");

// File select (click)
inputFile.addEventListener("change", uploadImage);

// Drag events
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("drag-over");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("drag-over");

    const files = e.dataTransfer.files;
    if (files.length) {
        inputFile.files = files;  // Update input element's files (optional)
        uploadImage(files[0]);     // Call upload with the dropped file
    }
});

function uploadImage() {
    let imgLink = URL.createObjectURL(inputFile.files[0]);

    // Clear previous content
    imgView.innerHTML = "";

    // Create new image element
    const img = document.createElement("img");
    img.src = imgLink;
    img.alt = "Uploaded Image";
    img.classList.add("uploaded-img");

    // Append image to view
    imgView.appendChild(img);
    removeBtn.style.display = "inline-block";
    removeBtn.style.marginTop = "20px"

    imgView.style.padding = 0;
    imgView.style.backgroundColor = "transparent";
    imgView.style.border = 0;

    sendImageToBackend(inputFile.files[0]);  // Add this at the end of uploadImage

}

removeBtn.addEventListener("click", () => {
    imgView.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>

        </svg>
        <h4>Drag and drop or click here<br>to upload image</h4>
        <span>Upload any images from desktop</span>
    `;
    imgView.style.padding = "50px";
    imgView.style.backgroundColor = "rgba(249,249,249,0.5)";
    imgView.style.border = "2px dashed rgba(94, 227, 86, 0.89)";
    inputFile.value = "";
    removeBtn.style.display = "none";
    clickInstruction.textContent = "Upload an image to generate the palette";
    clickInstruction.style.display = "block";
    colorDetails.style.display = "none";
    for (let i = 0;i<10;i++) {
        const square = document.getElementById(`color${i + 1}`);
        if (square) {
            square.style.backgroundColor = "white";
        }
    };
});

function sendImageToBackend(file) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("sections", 10); // Optional
    clickInstruction.textContent = "Generating Palette...";

    fetch("/get-dominant-colors", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        clickInstruction.textContent = "Click on a color to see info";
        console.log("Most used colors:", data.colors);
        // display them in the UI if you like!
        const colors = data.colors; // e.g., ["rgb(245,245,245)", "rgb(10,10,10)", ...]
        showColors(colors);
    })
    .catch(err => console.error("Color extraction failed", err));
}

function showColors(colors) {
    colorInfo.style.display = "block"; // Step 1
        // Step 1
    colorDetails.style.display = "none";

    colors.forEach((color, index) => {
        const square = document.getElementById(`color${index + 1}`);
        if (square) {

            square.style.backgroundColor = color.hex;
            square.style.cursor = "pointer";

            square.onclick = () => {
                clickInstruction.style.display = "none"; // Step 3
                // Get RGB values from "rgb(r, g, b)"-->
                // const rgbValues = rgbColor.match(/\d+/g);
                // const hexColor = rgbToHex(...rgbValues);

                hexSpan.textContent = color.hex;
                rgbSpan.textContent = color.rgb;
                colorDetails.style.display = "block";
            };
        }
    });
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

function copyText(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied ${text}`);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}