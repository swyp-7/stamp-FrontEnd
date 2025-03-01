export const byteToImageUrl = (byteArr: number[]): string => {
  // 음수 값을 양수로 변환 (바이트는 0-255 범위여야 함)
  const unsignedBytes = byteArr.map((byte) => (byte < 0 ? byte + 256 : byte));

  // Uint8Array로 변환
  const uint8Array = new Uint8Array(unsignedBytes);

  // Blob 객체 생성
  const blob = new Blob([uint8Array], { type: "image/png" });

  // Blob URL 생성
  return URL.createObjectURL(blob);
};
