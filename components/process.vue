<template>
  <div class="proc-container">
    <div :class="['proc-element', {glow: active}]" @click="emit('activate')">
      <!--<ProcessIcon />-->
      {{id}}
    </div>
    <div class="proc-control" v-if="active">
      Active
      <button @click="runSnap()">Run</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string,
  active: boolean,
}>();
const emit = defineEmits<{
  (e: 'activate') : void,
}>();
const gfxRegisters: Ref<IRegister[]> = inject<Ref<IRegister[]>>("A2");
const snapRegisters: Ref<IRegister[]> = inject<Ref<IRegister[]>>("A3");
const proc = new ProcessSnap(props.id, gfxRegisters, snapRegisters);

function runSnap() {
  proc.write(props.id);
}


</script>

<style scoped lang="scss">
.proc-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--light-text);
  gap: 1rem;
}
.proc-element {
  width: 80px;
  height: 80px;
  border: 2px solid var(--border-color);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  &.glow {
    box-shadow: 0 0 10px 1px var(--glow-color);
  }
}
</style>
