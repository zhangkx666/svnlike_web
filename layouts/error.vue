<template>
  <div>
    <a @click="$router.go(-1)">Go Back</a>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  created() {
    console.log(this.error)
  },
}
</script>

<style scoped></style>
