import { EState } from '~/types/state';
import { ShallowSet } from './ShallowSet';
export class ProcessSnap {

  A2: Ref<IRegister[]>;
  A3: Ref<IRegister[]>;
  id: string;
  nbWrite: number = 0;
  procEntry: IDataEntry;
  toWrite: IDataEntry | null = null;
  gfxKnown: ShallowSet = new ShallowSet();
  gfxNotKnown: number[] = [];
  snapKnown: Ref<ShallowSet>;
  snapNotKnown: number[] = [];
  snapOldNbParticipants: Ref<number>;
  snapNbParticipants: Ref<number>;
  state: Ref<EState>;

  constructor(id: string, state: Ref<EState>, snapKnown: Ref<ShallowSet>, oldNbParticipant: Ref<number>,
    nbParticipant: Ref<number>, a2: Ref<IRegister[]>, a3: Ref<IRegister[]>) {
    this.id = id;
    this.A2 = a2; // Shared array to track participants (from GFX)
    this.A3 = a3; // Shared array for the SnapShot repository
    this.snapKnown = snapKnown;
    this.snapOldNbParticipants = oldNbParticipant;
    this.snapNbParticipants = nbParticipant;
    this.snapKnown = snapKnown;
    this.procEntry = { proc: this.id };
    this.state = state;
  }

  write(fact: string) {
    if (this.state.value !== EState.IDLE) {
      throw new Error("You can start a write only while idle");
    }
    this.state.value = EState.WRITE;
    return this.run(fact);
  }

  run(fact?: string) {
    switch (this.state.value) {
      case EState.IDLE:
        console.log("idle");
        return;
      case EState.WRITE:
        console.log("write", `-${typeof fact}-`);
        if (fact === undefined || fact === null) {
          throw new Error('You have to provide a fact');
        }
        if (fact !== '') {
          this.toWrite = { proc: this.id, nbWrite: this.nbWrite++, data: fact };
        } else {
          this.toWrite = null;
        }
        this.state.value = EState.INIT;
      case EState.INIT:
        console.log("init");
        this.init();
        break;
      case EState.GFXa:
        console.log('gfxA');
        this.gfxA();
        break;
      case EState.GFXb:
        console.log('gfxB');
        this.gfxB();
        break;
      case EState.SNAPb:
        console.log('snapB');
        this.snapB();
        break;
      case EState.SNAPc:
        console.log('snapC');
        this.snapC();
        break;
      case EState.SNAPd:
        console.log('snapD');
        this.snapD();
        break;
      case EState.SNAPe:
        console.log('snapE');
        this.snapE();
        break;
      default:
        throw new Error(`Unknown state ${this.state.value}`);
    }

  }
  init() {
    this.gfxKnown = new ShallowSet([this.procEntry]);
    this.gfxNotKnown = [];
    this.snapKnown.value = new ShallowSet();
    this.snapNotKnown = [];
    this.snapOldNbParticipants.value = 0;
    this.snapNbParticipants.value = 0;
    this.state.value = EState.GFXa;
  }

  // GFX: Determines the set of participants
  gfxA() {
    // Aggregate known participants from A2
    let allSets = this.A2.value.map(set => new ShallowSet(set.data)); // Deep copy
    for (let set of allSets) {
      this.gfxKnown = new ShallowSet([...this.gfxKnown, ...set]);
    }

    // Find registers that do not match the current known set
    this.gfxNotKnown = [];
    const emptySet = new ShallowSet();
    for (let i = 0; i < this.gfxKnown.size; i++) {
      const testSet = i >= this.A2.value.length ? emptySet : this.A2.value[i].data;
      if (!this.setEquals(testSet, this.gfxKnown)) {
        this.gfxNotKnown.push(i);
      }
    }
    if (this.gfxNotKnown.length) {
      this.state.value = EState.GFXb;
    } else {
      const activeProcesses = this.gfxKnown;
      this.writeToArray(this.A2.value, activeProcesses.size - 1, new ShallowSet(activeProcesses));
      this.state.value = EState.SNAPb;
    }
  }

  gfxB() {
    // Update the first not known register
    if (this.gfxNotKnown.length === 0) {
      throw new Error("gfxNotKnown should not be empty in GFXb");
    }
    this.writeToArray(this.A2.value, this.gfxNotKnown[0], new ShallowSet(this.gfxKnown));
    this.state.value = EState.GFXa;
  }

  snapB() {
    this.snapKnown.value.add(this.toWrite);
    this.snapNbParticipants.value = this.countParticipants();

    this.state.value = EState.SNAPc;
  }

  snapC() {
    this.snapOldNbParticipants.value = this.snapNbParticipants.value;

    // Add all available values
    this.A3.value.forEach((set) => {
      this.snapKnown.value = new ShallowSet([...this.snapKnown.value, ...set.data]);
    });

    // Find registers that do not match the current known set
    this.snapNotKnown = [];
    const emptySet = new ShallowSet();
    for (let i = 0; i < this.snapNbParticipants.value; i++) {
      const testSet = i >= this.A3.value.length ? emptySet : this.A3.value[i].data;
      if (!this.setEquals(testSet, this.snapKnown.value)) {
        this.snapNotKnown.push(i);
      }
    }

    // Update the first not known register
    if (this.snapNotKnown.length > 0) {
      this.state.value = EState.SNAPd;
    } else {
      this.state.value = EState.SNAPe;
    }
  }

  snapD() {
    this.writeToArray(this.A3.value, this.snapNotKnown[0], new ShallowSet(this.snapKnown.value));
    this.state.value = EState.SNAPc;
  }

  snapE() {
    this.snapNbParticipants.value = this.countParticipants();
    if (this.snapNbParticipants.value === this.snapOldNbParticipants.value) {
      this.state.value = EState.IDLE;
    } else {
      this.state.value = EState.SNAPc;
    }
  }

  writeToArray(array: IRegister[], index: number, value: ShallowSet) {
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
  countParticipants(): number {
    let temp = new ShallowSet();
    let allSets = this.A2.value.map(set => new ShallowSet(set.data)); // Deep copy
    for (let set of allSets) {
      temp = new ShallowSet([...temp, ...set]);
    }
    return temp.size;
  }

  // Utility to compare two sets for equality
  setEquals(setA: ShallowSet, setB: ShallowSet) {
    if (setA.size !== setB.size) return false;
    for (let elem of setA) {
      if (!setB.has(elem)) return false;
    }
    return true;
  }
}
