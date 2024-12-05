<template>
  <div class="container">
    <ProcessesList
      :processes="processes"
      :activeProcess="activeProcess"
      @clicked="(idx) => activeProcess = idx"
      @add-process="addProcess"
    />
    <MWMRArray area="a1" name="Array 1" :registers="A2"/>
    <MWMRArray area="a2" name="Array 2" :registers="A3"/>
    <ActiveCode />
  </div>
</template>

<script setup lang="ts">
const processes = ref<IProcess[]>([]);
const processesEl = ref<typeof process[]>([]);
const lastIdx = ref(0);
const A2 = ref<IRegister[]>([]);
const A3 = ref<IRegister[]>([]);
provide('A2', A2);
provide('A3', A3);
const activeProcess = ref(-1);

function addProcess() {
  processes.value.push({
    id: 'P' + lastIdx.value
  });
  activeProcess.value = lastIdx.value;
  lastIdx.value++;
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(279deg, rgba(0,5,6,1) 0%, rgba(2,21,31,1) 100%);

  display: grid;
  grid-template-areas: "proc a1 a2 code";
  grid-template-columns: 2fr 2fr 2.5fr 3fr;
  justify-items: center;
  align-content: stretch;
  --block-padding: 4rem;
}
</style>
