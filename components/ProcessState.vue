<template>
  <span>
    <div class="array-name mid" v-if="state !== null">P{{ activeProcess }} State</div>
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
              NEW FACT:
            </label>
            <span class="data">
              {{getToWrite() ?? '&#x27C2'}}
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
              Known:
            </label>
            <span class="data">
              <div v-for="data, idx in sortArrayData(getKnown())" :key="idx">
                {{ formatArrayData(data) }}
              </div>
            </span>
          </span>
          <span class="data-line">
            <label>
              NotKnown:
            </label>
            <span class="data inline">
              [
              <div v-for="data, idx in getNotKnown()" :key="idx">
                {{(idx > 0 ? ', ' + data : data )}}
              </div>
              ]
            </span>
          </span>
        </span>
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  state: IRunningState | null,
  activeProcess: number,
}>();
function getToWrite () {
  if (!props.state.toWrite.value) return null;
  return props.state.toWrite.value.data;
}
function getKnown() : IDataEntry[] {
  if (!props.state.known) return [];
  return Array.from(props.state.known.value);
}
function getNotKnown() : number[] {
  if (!props.state.notKnown) {
    return [];
  }
  return props.state.notKnown.value.sort();
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
  display: flex;
  flex-direction: column;
  &.inline {
    flex-direction: row;
  }
}
.inner-container.no-gap {
  padding-inline: 0 2rem;
  gap:0;
}
.inner-container.wide {
  width: 100%;
  box-sizing: border-box;
  padding-inline: 1rem;
  padding-block: 1rem;
}
.code-block {
  --margin: 3rem;
  width: calc(100% - 2 * var(--margin));
  background: transparent;
  color: var(--light-text);
  margin-inline: 0;
  display: grid;
  grid-template-columns: 8ch auto;

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
