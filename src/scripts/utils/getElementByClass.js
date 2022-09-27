export function getElementByClass(className, parent = document) {
  return parent.querySelector(`.${className}`);
}