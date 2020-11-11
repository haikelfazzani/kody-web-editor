const vueTemplate = [
  `<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>`,
  'body { color: red; }',
  `Vue.createApp({
  data() {
    return {
      counter: 1
    }
  }
}).mount('#basic-event')`];

export default vueTemplate;