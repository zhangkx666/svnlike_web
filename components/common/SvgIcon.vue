<template>
  <svg class="icon s13em" aria-hidden="true">
    <use :xlink:href="'#icon-' + icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
