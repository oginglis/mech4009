import { createApp } from 'vue'
import App from './App.vue'
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";

function onMathJaxReady() {
  const el = document.getElementById("hello");
  renderByMathjax(el);
}
initMathJax({}, onMathJaxReady);
const app = createApp(App);

app.use(MathJax);
app.mount('#app');

