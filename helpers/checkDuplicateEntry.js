const checkDuplicateEntry = (value, obj) => {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].name === value) {
      return true;
    }
  }
  return false;
};

export default checkDuplicateEntry;
