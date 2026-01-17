export const fileToBase64 = async (file: File): Promise<string> => {
  // Node.js 환경 (테스트, SSR 등)
  if (typeof Buffer !== "undefined") {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer).toString("base64");
  }

  // Browser 환경 (FileReader 사용)
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64 = result.split(",")[1];
        resolve(base64);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };

    reader.onerror = () => {
      reject(new Error("파일 읽기 실패"));
    };

    reader.readAsDataURL(file);
  });
};
