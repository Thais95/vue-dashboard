<template>
	<header class="header">
		<h1 class="title">Dashboard de Licitações</h1>
	</header>
</template>

<script>
export default {
  name: 'DashboardHeader'
}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 200px;
		background-color: whitesmoke;
		display: flex;
		justify-content: center;
		align-items: center;
		.title {
			font-size: 2rem;
			color: var(---primary);
			cursor: default;
		}
	}
</style>