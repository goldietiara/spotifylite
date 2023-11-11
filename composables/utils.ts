// utils.js

export async function getColorFromImage(imageUrl: any) {
  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0, image.width, image.height);

      const centerX = Math.floor(image.width / 2);
      const centerY = Math.floor(image.height / 2);

      const pixel: any = ctx?.getImageData(centerX, centerY, 1, 1).data;

      const rgbaColor = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      resolve(rgbaColor);
    };

    image.onerror = function () {
      reject(new Error("Failed to load image"));
    };

    image.src = imageUrl;
  });
}
