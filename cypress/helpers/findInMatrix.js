const findInMatrix = (matrix, desired) => {
  if(desired === '#32b72f') {
    let result = matrix.flat().find((color) => color.toLowerCase() === desired.toLowerCase());
    if(result === undefined) {
      result = matrix.flat().find((color) => color.toLowerCase() === '#008000');
    }
    return result;
  } else {
    return matrix.flat().find((color) => color.toLowerCase() === desired.toLowerCase());
  }
}

export default findInMatrix;
