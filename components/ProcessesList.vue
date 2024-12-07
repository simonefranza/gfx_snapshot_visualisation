<template>
  <div class="main-container" id="procs-container">
    <div class="array-name">Processes</div>
    <div class="processes">
      <div class="inner-container left">
        <process v-for="proc, idx in processes" :key="proc.id" :id="proc.id" :active="idx === activeProcess"
          ref="processesEl" @activate="(state) => activateProcess(idx, state)"></process>
        <div class="btn-container">
          <button class="add-proc-btn" @click="addProcess">+</button>
        </div>
      </div>
    </div>
    <div class="divider" />
    <ProcessState :activeProcess="activeProcess" :state="getRunningState" />
  </div>
</template>

<script setup lang="ts">
import type { IRunningState } from '~/types/runningState';

const props = defineProps<{
  processes: IProcess[],
  activeProcess: number
}>();
let runningState: IRunningState[] = [];
const emit = defineEmits<{
  (e: 'clicked', idx: number, state: IRunningState): void,
  (e: 'addProcess'): void,
}>();
function activateProcess(idx: number, state: IRunningState) {
  runningState[idx] = state;
  emit('clicked', idx, state);
}
function addProcess() {
  runningState.push({});
  emit('addProcess');
}
const getRunningState = computed(() => {
  if (props.activeProcess >= 0 && props.activeProcess < runningState.length) {
    return runningState[props.activeProcess];
  }
  return null;
});
</script>

<style scoped lang="scss">
#procs-container {
  grid-area: proc;
  display: grid;
  grid-template-rows: 1fr 2px 1fr;

}

.processes {
  height: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.add-proc-btn {
  height: 40px;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 40px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(2, 21, 31, 1);
  background: #FDCA89;
  font-size: 2rem;
  color: rgba(2, 21, 31, 1);
  cursor: pointer;
}

.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider {
  background: var(--border-color);
  width: 80%;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
}

.inner-container.left {
  padding-inline: 0;
}
</style>
