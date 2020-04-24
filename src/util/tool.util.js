//补零操作
export function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  }