<template>
	<div class="loading-overlay">
		<md-spinner md-indeterminate />
	</div>
</template>

<style lang="stylus" scoped>
.loading-overlay {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(white, .7);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
}
</style>

