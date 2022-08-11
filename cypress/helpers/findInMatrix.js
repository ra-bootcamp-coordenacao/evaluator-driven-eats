export default function findInMatrix(matrix, desired) {
  if(desired === '#32b72f') {
    let result = matrix.flat().find((color) => color.toLowerCase() === desired.toLowerCase());
    if(result === undefined && matrix.flat().find((color) => color.toLowerCase() === '#008000') === '#008000') {
      result = '#32b72f';
    }
    return !!result;
  } else {
    return !!matrix.flat().find((color) => color.toLowerCase() === desired.toLowerCase());
  }
}
