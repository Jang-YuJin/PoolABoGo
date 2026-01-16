export const fileToBase64 = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();

  // Node.js 환경
  if (typeof Buffer !== "undefined") {
    return Buffer.from(arrayBuffer).toString("base64");
  }

  // Browser 환경
  return new Promise<string>((resolve, reject) => {
    const blob: Blob = new Blob([arrayBuffer]);
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64 = result.split(",")[1];
        resolve(base64);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };

    reader.onerror = () => reject(reader.error);

    reader.readAsDataURL(blob);
  });
};