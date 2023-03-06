<template>
	<header class="header">
		<h1 class="title">Encontrar <br> <span class="space">Licitações</span></h1>
		<img class="image" src="../assets/header.png" alt="Lupa">
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
		@media screen and (max-width: 760px) {
			height: auto;
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 80px 0;
			align-items: center;
		}
		.image {
			width: 280px;
			height: auto;
			margin-left: -30px;
			@media screen and (max-width: 760px) {
				display: none;
			}
		}
		.title {
			font-family: 'Nunito', sans-serif;
			font-size: 4rem;
			font-weight: 900;
			color: var(---secondary);
			cursor: default;
			user-select: none;
			text-align: center;
			@media screen and (max-width: 760px) {
				font-size: 3.2rem;
			}
		}
		.space {
			margin-left: 80px;
			@media screen and (max-width: 760px) {
				margin: 0;
			}
		}
	}
</style>