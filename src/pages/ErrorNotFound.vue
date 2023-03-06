<template>
	<div class="error-container">
		<h1 class="error-title">Ops, ocorreu algum erro!</h1>
		<h5 class="error-subtitle">Not Found - Parece que essa página não existe</h5>
		<a href="/"><button class="return-button">Retornar</button></a>
	</div>
</template>

<style lang="scss" scoped>
	.error-container {
		width: 100vw;
		height: 100vh;
		background-color: var(---primary);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 68px;
		.error-title {
			color: white;
			cursor: default;
			font-size: 2.4rem;
		}
		.error-subtitle {
			font-size: 1.2rem;
			cursor: default;
			margin-top: -20px;
		}
		.return-button {
			height: 50px;
			width: 160px;
			background-color: var(---secondary);
			color: white;
			font-size: 1.2rem;
			font-weight: 600;
			border-radius: 8px;
			cursor: pointer;
			transition: 0.8s;
			&:hover {
				transition: 0.8s;
				background-color: var(---primary);
			}
			a {
				color: white;
			}
		}
	}
</style>