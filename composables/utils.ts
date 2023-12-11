export async function getColorFromImage(imageUrl: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0, image.width, image.height);

      const centerX = Math.floor(image.width / 2);
      const centerY = Math.floor(image.height / 2);

      try {
        const pixel: any = ctx?.getImageData(centerX, centerY, 1, 1).data;

        const rgbaColor = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        resolve(rgbaColor);
      } catch (error) {
        reject(new Error("Failed to get image data"));
      }
    };

    image.onerror = function () {
      reject(new Error("Failed to load image"));
    };

    // Convert the image to a Base64 data URL
    const reader = new FileReader();
    reader.onloadend = function () {
      if (typeof reader.result === "string") {
        image.src = reader.result;
      } else {
        reject(new Error("Failed to convert image to Base64"));
      }
    };

    // Make an XHR request to get the image as a Blob
    const xhr = new XMLHttpRequest();
    xhr.open("GET", imageUrl);
    xhr.responseType = "blob";

    xhr.onload = function () {
      if (xhr.status === 200) {
        reader.readAsDataURL(xhr.response);
      } else {
        reject(new Error("Failed to fetch image"));
      }
    };

    xhr.send();
  });
}
