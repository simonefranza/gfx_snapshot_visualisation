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
    if (!data || findCircularReferences(data)) {
      console.warn('Circular reference detected:', data);
      return this;
    }
    return super.add(data);
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
function findCircularReferences(obj) {
    const seen = new WeakSet();

    function detect(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        if (seen.has(obj)) {
      console.log(obj);
            return true;
        }
        seen.add(obj);

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && detect(obj[key])) {
            console.log(key);
                return true;
            }
        }
        return false;
    }

    return detect(obj);
}
