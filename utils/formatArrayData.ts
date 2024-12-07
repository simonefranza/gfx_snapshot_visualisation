export function formatArrayData(el: IDataEntry) {
  let str = "[";
  str += el.proc;
  if ('nbWrite' in el) {
    str += ', ' + el.nbWrite.toString();
  }
  if ('data' in el) {
    str += ', ' + el.data;
  }

  return str + ']';
}

