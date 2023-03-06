<template>
	<header class="header">
		<h1 class="title">Encontrar <br> <span class="space">Licitações</span></h1>
		<img class="image" src="../assets/search.svg" alt="Lupa">
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
		height: 320px;
		background: rgb(247,253,255);
		background: linear-gradient(90deg, rgba(247,253,255,1) 0%, rgba(249,254,255,1) 20%, rgba(255,255,255,1) 50%, rgba(249,254,255,1) 80%, rgba(247,253,255,1) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		.image {
			width: 380px;
			height: auto;
		}
		.title {
			font-family: 'Nunito', sans-serif;
			font-size: 4rem;
			font-weight: 900;
			color: #24285b;
			cursor: default;
			user-select: none;
			text-align: center;
		}
		.space {
			margin-left: 80px;
		}
	}
</style>