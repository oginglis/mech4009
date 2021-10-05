<template>
  <div id="app">
    <metainfo>
      <template v-slot:title="{ content }">{{
        content ? `${content} | Moment Vector` : `Moment Vector`
      }}</template>
    </metainfo>
    <TitleSection />
  </div>
</template>

<script>
import TitleSection from "./components/TitleSection.vue";
import { useMeta } from "vue-meta";
export default {
  name: "App",
  components: {
    TitleSection,
  },
  setup() {
    useMeta({
      title: "",
      htmlAttrs: { lang: "en", amp: true },
    });
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
