export default function generateImageURL(imagePath: string): string {
  return `https://storage.cloud.google.com/beef-noodle-v2.appspot.com/${imagePath}`;
}
