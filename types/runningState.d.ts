import {EState} from "./state";

declare interface IRunningState {
  state: Ref<EState>
  toWrite: Ref<IDataEntry | null>
  oldNbParticipant: Ref<number>
  nbParticipant: Ref<number>
  known: Ref<ShallowSet>
  notKnown: Ref<[]>,
}
