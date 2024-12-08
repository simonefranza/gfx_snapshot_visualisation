export class ShallowSet extends Set {

  constructor(data?: IDataEntry[] | ShallowSet) {
    super();
    data?.forEach((el) => {
      if (el && !this.has(el)) {
        this.add(el);
      }
    });
  }
  override values() {
    return super.values();
  }
  override add(data: IDataEntry | null) {
    if (!data) {
      return this;
    }
    return super.add(data);
  }
  override has(test: IDataEntry | null) {
    if (!test) {
      return false;
    }
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
