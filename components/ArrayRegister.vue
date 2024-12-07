<template>
  <div class="register-container" >
    <p class="register-idx">{{register.idx}}</p>
    <div class="data">
      <div class="corner top left"></div>
      <div class="corner top right"></div>
      <div class="corner bottom left"></div>
      <div class="corner bottom right"></div>
      <p v-for="el,idx in sortArrayData(register.data)"
        :key="idx">{{formatArrayData(el)}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sortArrayData } from "../utils/sortArrayData";
const props = defineProps<{
  register: IRegister
}>();

</script>

<style scoped lang="scss">
.register-container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: var(--light-text);
}
.data{
  position: relative;
  width: fit-content;
  min-width: 80px;
  color: var(--light-text);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  padding: 18px; /* the gap between the border and image */
  & p {
    margin: 0;
  }
}
.corner {
  position: absolute;
  border: 0px solid var(--border-color);
  --border-size: 2px;
  --border-length: 20px;
  --border-radius: 7px;
  //border-radius: 10px;
  width: var(--border-length);
  height: var(--border-length);
}

.top {
  top: 0;
  border-top-width: var(--border-size); /* Only top-left corner */
}
.left{
  left: 0; border-left-width: var(--border-size); /* Only top-left corner */
}
.right {
  right: 0;
  border-right-width: var(--border-size); /* Only top-left corner */
}
.bottom {
  bottom: 0;
  border-bottom-width: var(--border-size); /* Only top-left corner */
}
.top.left {
  border-top-left-radius: var(--border-radius);
}
.top.right{
  border-top-right-radius: var(--border-radius);
}
.bottom.left {
  border-bottom-left-radius: var(--border-radius);
}
.bottom.right{
  border-bottom-right-radius: var(--border-radius);
}
.register-idx {
  position: absolute;
  padding: 0;
  margin: 0;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
