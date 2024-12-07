export function sortArrayData(data: Set<IDataEntry> | IDataEntry[]) {
  return Array(...data).sort((a, b) => {
    if (a.proc != b.proc) {
      return a.proc < b.proc ? -1 : 1;
    }
    if (!('nbWrite' in a && a.nbWrite !== undefined && 'nbWrite' in b && b.nbWrite !== undefined)) {
      throw new Error("proc is the same but nbWrite is not available");
    }
    return a.nbWrite - b.nbWrite;
  });

}
