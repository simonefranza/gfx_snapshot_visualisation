<template>
  <div class="main-container procs-container">
    <div class="array-name">Processes</div>
    <div class="processes">
      <div class="inner-container">
        <process
          v-for="proc,idx in processes"
          :key="proc.id"
          :id="proc.id"
          :active="idx === activeProcess"
          ref="processesEl"
          @activate="(state) => emit('clicked', idx, state)"
        ></process>
        <div class="btn-container">
          <button
            class="add-proc-btn"
            @click="emit('addProcess')"
          >+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRunningState } from '~/types/runningState';

const props = defineProps<{
  processes: IProcess[],
  activeProcess: number
}>();
const emit = defineEmits<{
  (e: 'clicked', idx: number, state: IRunningState) : void,
  (e: 'addProcess') : void,
}>();
</script>

<style scoped lang="scss">
.procs-container {
  grid-area: proc;
}
.processes {
  height: 100%;
  overflow-y: auto;
  grid-area: proc;
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
</style>
