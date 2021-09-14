<template>
  <ThreeCanvas />
</template>

<script>
import ThreeCanvas from "./components/ThreeCanvas.vue";

export default {
  name: "App",
  components: {
    ThreeCanvas,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
