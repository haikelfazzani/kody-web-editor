const vueTemplate = [
  `<script src="https://unpkg.com/vue"></script>

<div id="app">
  <h1>Vue</h1>
  <h2>{{ count }}</h2>
  <button @click="inc">inc</button>
  <button @click="dec">dec</button>
</div>`,
  'body { color: red; }',
  `new Vue({
  el: '#app',
  data: { count: 0 },
  methods: {
    inc() {
      this.count++
    },
    dec() {
      this.count--
    }
  }
})`];

export default vueTemplate;