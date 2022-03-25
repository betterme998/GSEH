<template>
  <div ref="slide" class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100vw;
    flex-shrink: 0;
  }
  .slide img {
    width: 100vw;
  }
</style>