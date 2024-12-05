export class ProcessSnap {

  A2: Ref<IRegister[]>;
  A3: Ref<IRegister[]>;
  id: string;
  nbWrite: number = 0;
  procEntry: IDataEntry;

  constructor(id: string, a2 : Ref<IRegister[]>, a3 : Ref<IRegister[]>) {
    this.id = id;
    this.A2 = a2; // Shared array to track participants (from GFX)
    this.A3 = a3; // Shared array for the SnapShot repository
    this.procEntry = {proc: this.id};
  }

  write(fact: string) {
    return this.snap({proc: this.id, nbWrite: this.nbWrite++, data:fact});
  }

  // GFX: Determines the set of participants
  gfx() {
    let known : ShallowSet = new ShallowSet([this.procEntry]);
    let notKnown : number[];

    do {
      // Aggregate known participants from A2
      let allSets = this.A2.value.map(set => new ShallowSet(set.data)); // Deep copy
      for (let set of allSets) {
        known = new ShallowSet([...known, ...set]);
      }

      // Find registers that do not match the current known set
      notKnown = [];
      const emptySet = new ShallowSet();
      for (let i = 0; i < known.size; i++) {
        const testSet = i >= this.A2.value.length ? emptySet : this.A2.value[i].data;
        if (!this.setEquals(testSet, known)) {
          notKnown.push(i);
        }
      }

      // Update the first not known register
      if (notKnown.length > 0) {
        this.writeToArray(this.A2.value, notKnown[0], new ShallowSet(known));
      }
    } while (notKnown.length > 0);

    return known;
  }

  // Snap operation: Add fact and read a consistent snapshot
  snap(fact: IDataEntry) {
    let activeProcesses = this.gfx(); // Get known participants using GFX
    console.log('write', new ShallowSet(activeProcesses), ' at ', activeProcesses.size - 1, 'for A2');
    this.writeToArray(this.A2.value, activeProcesses.size - 1, new ShallowSet(activeProcesses));
    let known = new ShallowSet();
    let notKnown = [];
    let nbParticipants = known.size; // Number of participants
    let oldNbParticipants = -1;
    let snapshot;

    while (nbParticipants != oldNbParticipants || notKnown.length) {
      // Add the fact to known
      known.add(fact);

      nbParticipants = this.countParticipants();
      oldNbParticipants = nbParticipants;

      // Add all available values
      this.A3.value.forEach((set) => {
        known = new ShallowSet([...known, ...set.data]);
      });

      // Find registers that do not match the current known set
      notKnown = [];
      const emptySet = new ShallowSet();
      for (let i = 0; i < nbParticipants; i++) {
        const testSet = i >= this.A3.value.length ? emptySet : this.A3.value[i].data;
        if (!this.setEquals(testSet, known)) {
          notKnown.push(i);
        }
      }

      // Update the first not known register
      if (notKnown.length > 0) {
        this.writeToArray(this.A3.value, notKnown[0], new ShallowSet(known));
        continue;
      }

      nbParticipants = this.countParticipants();
    }
    console.log(known);
  }

  writeToArray(array: IRegister[], index : number, value: ShallowSet) {
    if (index > array.length) {
      throw new Error(`Index is too big? ${index} vs ${array.length}`);
    }

    if (index >= array.length) {
      array.push({
        idx: index + 1,
        data: value
      });
    } else {
      array[index].data = value;
    }
  }

  // Count participants based on A2
  countParticipants() : number {
    let temp = new ShallowSet();
    let allSets = this.A2.value.map(set => new ShallowSet(set.data)); // Deep copy
    for (let set of allSets) {
      temp = new ShallowSet([...temp, ...set]);
    }
    return temp.size;
  }

  // Utility to compare two sets for equality
  setEquals(setA : ShallowSet, setB : ShallowSet) {
    if (setA.size !== setB.size) return false;
    for (let elem of setA) {
      if (!setB.has(elem)) return false;
    }
    return true;
  }
}
