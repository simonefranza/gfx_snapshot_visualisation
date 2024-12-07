<template>
  <div class="main-container">
    <div class="array-name">Pseudo Code</div>
    <div class="code-container">
      <div class="inner-container no-gap">
      <div :class="['code-block', {'highlight' : getState() == EState.IDLE}]" >
        <label>IDLE</label>
      </div>
      <div :class="['code-block', {'highlight' : getState() == EState.INIT}]" >
        <label>INIT</label>
        <pre>
<b>variables</b> A1 = [ i &#8712 Nat -> {} ],
          A2 = [ i &#8712 Nat -> {} ],
          known = {self},
          notKnown = {},
          oldNbParticipant = 0,
          nbParticipant = 0;
      </pre>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.GFXa}]" >
      <label>GFXa</label>
      <pre>
known := known &cup; NUnion(A1);
notKnown := { i &#8712; 0 .. (|known|) :
                 known != A1[i] };

<b>if</b> ( notKnown == {} )
    A1[|known| - 1] = known
    known := {};
    notKnown := {};
    <b>goto</b> SNAPb;
      </pre>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.GFXb}]" >
      <label>GFXb</label>
      <pre>
<b>with</b>( i &#8712; notKnown )
    { A1[i] := known }

<b>goto</b> GFXa
      </pre>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPb}]" >
      <label>SNAPb</label>
      <pre>
<b>while</b> ( TRUE )
    known := newFact &cup; known;
    nbParticipant := |NUnion(A1)|;
      </pre>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPc}]" >
      <label>SNAPc</label>
      <pre>
    oldNbParticipant := nbParticipant;

    known := known &cup; NUnion(A2);
    notKnown := { i &#8712 0 .. (nbParticipant - 1) :
                      known != A2[i] };
    <b>if</b> ( notKnown == {} )
        <b>goto</b> SNAPe
      </pre>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPd}]" >
      <label>SNAPd</label>
      <pre>
    <b>with</b> ( i &#8712 notKnown )
        { A2[i] := known }

    <b>goto</b> SNAPc
      </pre>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPe}]" >
      <label>SNAPe</label>
      <pre>
    nbParticipant := |NUnion(A1)|;

    <b>if</b> ( oldNbParticipant == nbParticipant )
        <b>return</b> known;

    <b>goto</b> SNAPc</pre>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EState } from '~/types/state';

const props = defineProps<{
  state: IRunningState | null,
}>();
function getState() {
  return props.state?.state.value;
}
</script>

<style scoped lang="scss">
.code-container {
  height: 100%;
  position: relative;
  grid-area: code;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  color: var(--light-text);
}

.array-name.mid {
  position: relative;
  top: unset;
  transform: unset;
}
label {
  text-transform: uppercase;
  font-size: 0.9em;
  opacity: 0.85;
}
.data-line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.data {
  text-align: left;
}
.inner-container.no-gap {
  padding-inline: 0 2rem;
  gap:0;
}
.inner-container.wide {
  width: 100%;
  box-sizing: border-box;
}
.code-block {
  --margin: 3rem;
  width: auto;
  background: transparent;
  color: var(--light-text);
  margin-inline: 0;
  display: grid;
  grid-template-columns: 8ch auto;
  border-radius: 5px;
  padding: 0 5px;
  &.highlight {
    background: #ffffff22;
  }
  & label {
    text-transform: unset;
  }
& pre {
  margin: 0;

}
}
</style>
