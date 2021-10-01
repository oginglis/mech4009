<template>
  <div>
    <h1>Moment About a Point (Vector Calculations)</h1>
    <p class="text-block">
      Given any point on an extended body, if there is a force acting on that
      body that does not travel through that point, then that force will cause a
      moment about that point. A moment is a force's tendency to cause rotation.
    </p>

    <ThreeCanvas2 />

    <p class="text-block">
      It is important to note here that all quantities (<math-jax
        latex="$$\vec{r}$$"
      ></math-jax
      >, <math-jax latex="$$\vec{F}$$"></math-jax> and
      <math-jax latex="$$\vec{M}$$"></math-jax>) are vectors. Before you can
      solve for the cross product, you will need to write out
      <math-jax latex="$$\vec{r}$$"></math-jax>
      and <math-jax latex="$$\vec{F}$$"></math-jax> in vector component form.
      Also, even for two dimensional problems, you will need to write out all
      three components of the <math-jax latex="$$\vec{r}$$"></math-jax> and
      <math-jax latex="$$\vec{F}$$"></math-jax> vectors. For two dimensional
      problems the z components of the
      <math-jax latex="$$\vec{r}$$"></math-jax> and
      <math-jax latex="$$\vec{F}$$"></math-jax> vectors will simply be zero, but
      those values are necessary for the calculations. The moment vector you get
      will line up with the axis of rotation for the moment, where you can use
      the right hand rule to determine if the moment is going clockwise or
      counterclockwise about that axis.
    </p>

    <p class="text-block">
      Finally, it is also important to note that cross product, unlike
      multiplication, is not communicative. This means that the order of the
      vectors matters, and <math-jax latex="$$\vec{r}$$"></math-jax> cross
      <math-jax latex="$$\vec{F}$$"></math-jax> will not be the same as
      <math-jax latex="$$\vec{F}$$"></math-jax> cross
      <math-jax latex="$$\vec{r}$$"></math-jax>. It is important to always use
      <math-jax latex="$$\vec{r}$$"></math-jax> cross
      <math-jax latex="$$\vec{F}$$"></math-jax> when calculating moments.
    </p>
  </div>
</template>

<script >
import ThreeCanvas2 from "./ThreeCanvas2.vue";
export default {
  name: "TitleSection",
  components: { ThreeCanvas2 },
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
  margin: 3rem auto;
  text-align: left;
}

.biggerlate {
  font-size: 3rem;
  margin-bottom: 5rem;
}
</style>
