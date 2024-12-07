<template>
  <div class="proc-container">
    <div :class="['proc-element', {glow: active}]" @click="activate()">
      <!--<ProcessIcon />-->
      {{id}}<br />
      <label>{{prettyState(state)}}</label>
    </div>
    <div class="proc-control" v-if="active">
      <div v-if="state === EState.IDLE" class="fact-container">
        <input v-model="userInput"/>
        <button @click="writeFact()"><WriteIcon /></button>
      </div>
      <div v-else class="fact-container">
        <button @click="runSnap()"><PlayIcon /></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EState } from '~/types/state';

const props = defineProps<{
  id: string,
  active: boolean,
}>();
const emit = defineEmits<{
  (e: 'activate', state: IRunningState) : void,
}>();
const gfxRegisters: Ref<IRegister[]> = inject<Ref<IRegister[]>>("A2");
const snapRegisters: Ref<IRegister[]> = inject<Ref<IRegister[]>>("A3");
const snapKnown : Ref<ShallowSet> = ref(new ShallowSet());
const oldNbParticipant : Ref<number> = ref(0);
const nbParticipant : Ref<number> = ref(0);
const state: Ref<EState> = ref(EState.IDLE);
const proc = new ProcessSnap(props.id, state, snapKnown, oldNbParticipant, nbParticipant, gfxRegisters, snapRegisters);
const userInput : Ref<string>= ref("");

function activate() {
  emit('activate', {state, oldNbParticipant, nbParticipant, known: snapKnown});
}

function writeFact() {
  if (!userInput.value) {
    userInput.value = '';
  }
  proc.write(userInput.value.trim());
  userInput.value = '';
}
function runSnap() {
  proc.run();
}
onMounted(() => {
  activate();
});
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  &.glow {
    box-shadow: 0 0 10px 1px var(--glow-color);
  }
}
.fact-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  & button {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    --size: 40px;
    height: var(--size);
    width: var(--size);
    cursor: pointer;
  }
  & input {
    width: 130px;
    background: #ffffff11;
    border: 1px solid var(--border-color);
    color: var(--light-text);
    font-size: 1rem;
    font-family: "Space Mono";
    padding: 5px 20px;
    border-radius: 12px;
    box-sizing: border-box;
    &:focus-visible {
      border: 1px solid var(--border-color);
      outline: none;
    }
  }
}
label {
  font-size: 0.9em;
  opacity: 0.75;
}
</style>
