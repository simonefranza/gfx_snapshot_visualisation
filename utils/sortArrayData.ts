export function sortArrayData(data: Set<IDataEntry>) {
  return Array(...data).sort((a, b) => {
    if (a.proc != b.proc) {
      return a.proc < b.proc ? -1 : 1;
    }
    return a.nbWrite - b.nbWrite;
  });

}
