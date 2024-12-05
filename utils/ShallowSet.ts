export class ShallowSet extends Set {

  constructor(data?: IDataEntry[] | ShallowSet) {
    super();
    data?.forEach((el) => {
      if (!this.has(el)) {
        this.add(el);
      }
    });
  }
  override has(test: IDataEntry) {
    for (const item of this) {
      if (this.isShallowMatch(item, test)) {
        return true;
      }
    }
    return false;
  }

  isShallowMatch(obj : IDataEntry, test: IDataEntry) {
    if ('nbWrite' in obj && 'nbWrite' in test) {
      return obj.proc === test.proc && obj.nbWrite === test.nbWrite;
    }
    if (!('nbWrite' in obj) && !('nbWrite' in test)) {
      return obj.proc === test.proc;
    }
    return false;
  }
}
