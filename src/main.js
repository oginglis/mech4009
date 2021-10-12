import { createApp } from 'vue'
import App from './App.vue'
import { createMetaManager } from 'vue-meta'
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
import { Vue3Mq } from "vue3-mq";

function onMathJaxReady() {
  const el = document.getElementById("hello");
  renderByMathjax(el);
}
initMathJax({}, onMathJaxReady);
const app = createApp(App);
app.use(createMetaManager())
app.use(Vue3Mq)
app.use(MathJax);
app.mount('#app');

