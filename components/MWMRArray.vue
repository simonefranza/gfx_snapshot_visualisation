<template>
  <div class="main-container mwmrarray-container" :style="`--area: ${area};`">
    <div class="array-name">{{name}}</div>
    <div class="array-container"  :data-name="name">
      <div class="inner-container" :style="`padding: ${registers.length === 0 ? 0 : 'auto'}`">
        <ArrayRegister
          v-for="register in registers"
          :key="register.idx"
          :register="register"
        />
      </div>
      <div class="empty-regs" 
        :style="`height: ${registers.length === 0 ? 'auto' : 0}; --sibling-count:${6}; padding-top: ${registers.length === 0 ? '2rem' : ''};`"
      >
        <!--<div v-for="i in [1,2,3]" :key="i" class="empty-data"> &#8734; </div>-->
        <!--<div v-for="i in [1,2,3,4,5]" :key="i" class="empty-data" :style="`--sibling-index:${i}`"> { } </div>-->
        <div v-for="i in [1,2,3,4,5,6]" :key="i" class="empty-data" :style="`--sibling-index:${i}`"> &empty; </div>
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
.mwmrarray-container {
  grid-area: var(--area);
}
.array-container {
  height: 100%;
  overflow-y: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.empty-regs {
  position: relative;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: stretch;
  gap: 32px;
}
.empty-data{
  position: relative;
  color: var(--light-text);
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  --s: 50px; /* the size on the corner */
  padding: 30px; /* the gap between the border and image */
  border: 2px dashed var(--border-color);
  border-radius: 10px;
  font-size: 1.5rem;
  line-height: 1.3rem;
  min-height: 45px;
  aspect-ratio: 1;
  opacity: calc((var(--sibling-count) + 1 - var(--sibling-index)) * 100% / (var(--sibling-count) + 1));
}
</style>
