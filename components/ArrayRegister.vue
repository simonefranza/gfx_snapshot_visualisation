<template>
  <div class="register-container" >
    {{register.idx}}
    <div class="data">
      <div class="corner top left"></div>
      <div class="corner top right"></div>
      <div class="corner bottom left"></div>
      <div class="corner bottom right"></div>
      <p v-for="el,idx in sortData(register.data)"
        :key="idx">{{formatData(el)}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  register: IRegister
}>();

function sortData(data: Set<IDataEntry>) {
  return Array(...data).sort((a, b) => {
    if (a.proc != b.proc) {
      return a.proc < b.proc ? -1 : 1;
    }
    return a.nbWrite - b.nbWrite;
  });

}

function formatData(el: IDataEntry) {
  let str = "[";
  str += el.proc;
  if ('nbWrite' in el) {
    str += ', ' + el.nbWrite.toString();
  }
  if ('data' in el) {
    str += ', ' + el.data;
  }

  return str + ']';
}
</script>

<style scoped lang="scss">
.register-container {
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
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  --s: 50px; /* the size on the corner */
  padding: 30px; /* the gap between the border and image */
//  -webkit-mask:
//    conic-gradient(at var(--s) var(--s),#0000 75%,#000 0)
//    0 0/calc(100% - var(--s)) calc(100% - var(--s)),
//    linear-gradient(#000 0 0) content-box;
//  mask:
//    conic-gradient(at var(--s) var(--s),#0000 75%,#000 0)
//    0 0/calc(100% - var(--s)) calc(100% - var(--s)),
//    linear-gradient(#000 0 0) content-box;
  & p {
    margin: 0;
  }
}
.corner {
  position: absolute;
  border: 0px solid var(--border-color);
  --border-size: 2px;
  --border-length: 40px;
  --border-radius: 10px;
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
</style>
