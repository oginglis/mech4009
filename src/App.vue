<template>
  <div id="app">
    <TitleSection />
  </div>
</template>

<script>
import TitleSection from "./components/TitleSection.vue";

export default {
  name: "App",
  components: {
    TitleSection,
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
}
</style>
