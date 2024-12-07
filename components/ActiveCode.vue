<template>
  <div class="main-container">
    <div class="array-name">Pseudo Code</div>
    <div :class="['code-block', {'highlight' : getState() == EState.IDLE}]" >
      <label>IDLE</label>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.GFXa}]" >
      <label>GFXa</label>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.GFXb}]" >
      <label>GFXb</label>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPb}]" >
      <label>SNAPb</label>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPc}]" >
      <label>SNAPc</label>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPd}]" >
      <label>SNAPd</label>
    </div>
    <div :class="['code-block', {'highlight' : getState() == EState.SNAPe}]" >
      <label>SNAPe</label>
    </div>
    <div class="code-container">
      <div class="inner-container">
      </div>
    </div>
    <div class="array-name mid" v-if="state !== null">P{{ activeProcess + 1 }} State</div>
    <div class="code-container" v-if="state !== null">
      <div class="inner-container wide">
        <span >
          <span class="data-line">
            <label>
              State
            </label>
            <span class="data" v-if="state">
              {{ prettyState(state.state.value) }}
            </span>
          </span>
          <span class="data-line">
            <label>
              Old Nr. Participants:
            </label>
            <span class="data">
              {{ state.oldNbParticipant }}
            </span>
          </span>
          <span class="data-line">
            <label>
              Current Nr. Participants:
            </label>
            <span class="data">
              {{ state.nbParticipant }}
            </span>
          </span>
          <span class="data-line">
            <label>
              Known Facts:
            </label>
            <span class="data">
              <div v-for="data, idx in sortArrayData(getKnown())" :key="idx">
                {{ formatArrayData(data) }}
              </div>
            </span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EState } from '~/types/state';

const props = defineProps<{
  state: IRunningState | null,
  activeProcess: number,
}>();
function getState() {
  return props.state?.state.value;
}
function getKnown() {
  if (!props.state.known) return [];
  const values = Array.from(props.state.known.value);
  console.log(props.state.known);
  console.log('test');
  console.log(values);

  values.forEach((item, index) => {
    console.log(`Value ${index}:`, item);
  });
  return values;
  //return values.map(item => this.removeCircularRefs(item));
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
</script>

<style scoped lang="scss">
.code-container {
  height: auto;
  position: relative;
  grid-area: code;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.inner-container.wide {
  width: 100%;
  box-sizing: border-box;
}
.code-block {
  --margin: 3rem;
  width: calc(100% - 2 * var(--margin));
  background: transparent;
  color: var(--light-text);
  margin-inline: var(--margin);

  &.highlight {
    background: #ffffff22;

  }
  & label {
    text-transform: unset;
  }
}
</style>
