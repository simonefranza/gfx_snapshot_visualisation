import {EState} from "./state";

declare interface IRunningState {
  state: Ref<EState>
  oldNbParticipant: Ref<number>
  nbParticipant: Ref<number>
  known: Ref<ShallowSet>
}
