<template>{{ a }}{{ name }}</template>
<script setup lang="ts">
var a = ref(0)

let name = reactive({
  a: 666
})
</script>
<style lang="scss" scoped></style>
