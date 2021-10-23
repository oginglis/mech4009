<template>
  <div class="page">
    <MobileTests />
  </div>
</template>

<script >
import MobileTests from "./mobileTests.vue";
export default {
  name: "TitleSection",
  components: { MobileTests },
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
