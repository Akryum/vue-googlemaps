<script>
import SimpleDemo from './SimpleDemo.vue'

export default {
	name: 'app',
	render (h) {
		return <div id="app">
			<SimpleDemo />
		</div>
	},
}
</script>

<style>
html,
body,
#app {
	height: 100%;
}

body {
	margin: 0;
	font-family: 'Roboto', Helvetica, Arial, sans-serif;
}
</style>
