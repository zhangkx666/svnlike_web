<template>
  <div>
    <div class="m-t-5 m-b-10">
      <label for="domain"><b>Domain or IP:</b></label>
    </div>
    <Row>
      <Cell :xl="14" :md="14" :sm="18" :xs="24">
        <input id="domain" ref="projectName" type="text" placeholder="Project name" class="w-p100" autocomplete="off" autofocus />
      </Cell>
    </Row>

    <div class="m-t-30 m-b-10">
      <label for="rootFolder"><b>SVN Root Folder:</b></label>
    </div>
    <Row>
      <Cell :xl="14" :md="14" :sm="18" :xs="24">
        <input id="rootFolder" ref="projectName" type="text" placeholder="Project name" class="w-p100" autocomplete="off" autofocus />
      </Cell>
    </Row>

    <div class="m-t-40">
      <h-button type="submit" size="l" class="x-btn"> Save settings </h-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style scoped></style>
