<template>
  <div class="page">
    <ThreeCanvas3 />
  </div>
</template>

<script >
import ThreeCanvas3 from "./ThreeCanvas3.vue";
export default {
  name: "TitleSection",
  components: { ThreeCanvas3 },
  data: function () {
    return {
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
    };
  },
};
</script>

<style  scoped>
.text-block {
  width: clamp(45ch, 50%, 75ch);
  /* margin: 3rem auto; */
  text-align: left;
}

.left {
  text-align: left;
}
.biggerlate {
  font-size: 3rem;
  margin-bottom: 5rem;
}
</style>
