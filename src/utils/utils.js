class Utils {
  static isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  static getRandomVal(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default Utils;
