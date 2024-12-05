<template>
  <div class="main-container">
    <div class="array-name">{{name}}</div>
    <div class="array-container" :style="`--area: ${area};`" :data-name="name">
      <div class="inner-container">
        <ArrayRegister
          v-for="register in registers"
          :key="register.idx"
          :register="register"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  area: string,
  name: string,
  registers: IRegister[],
}>();
</script>

<style scoped lang="scss">
.array-container {
  height: 100%;
  overflow-y: auto;
  grid-area: var(--area);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
