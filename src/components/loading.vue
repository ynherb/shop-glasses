<template>
<div class="loading">
<div class="position spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>
</template>
<style lang="scss" scoped>
.position {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin: auto;
}
.loading {
  width: 100vw;
  height: 100%;
  background: #ffff;
}
</style>
