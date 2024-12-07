import {EState} from "../types/state";
export default function(state: EState) {
  switch (state) {
    case EState.IDLE:
      return "IDLE";
    case EState.WRITE:
      return "WRITE";
    case EState.INIT:
      return "INIT";
    case EState.GFXa:
      return "GFXa";
    case EState.GFXb:
      return "GFXb";
    case EState.SNAPb:
      return "SNAPb";
    case EState.SNAPc:
      return "SNAPc";
    case EState.SNAPd:
      return "SNAPd";
    case EState.SNAPe:
      return "SNAPe";
  }
}
