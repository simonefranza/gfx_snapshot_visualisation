<template>
  <div class="main-container">
    <div class="array-name">Processes</div>
    <div class="processes">
      <div class="inner-container">
        <process
          v-for="proc,idx in processes"
          :key="proc.id"
          :id="proc.id"
          :active="idx === activeProcess"
          ref="processesEl"
          @activate="emit('clicked', idx)"
        ></process>
        <button
          class="add-proc-btn"
          @click="emit('addProcess')"
        >+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  processes: IProcess[],
  activeProcess: number
}>();
const emit = defineEmits<{
  (e: 'clicked', idx: number) : void,
  (e: 'addProcess') : void,
}>();
</script>

<style scoped lang="scss">
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
</style>
