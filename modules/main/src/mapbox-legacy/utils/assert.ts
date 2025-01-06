export default function assert(condition: any, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}
