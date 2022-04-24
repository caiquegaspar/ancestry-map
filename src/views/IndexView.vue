<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToResults = () =>
	router.push({
		name: "map",
	});
</script>

<template>
	<div class="pt-16 pl-16">
		<header class="text-black">
			<div class="relative flex items-center justify-center h-6 w-24">
				<img class="absolute h-full w-full" src="@/assets/logo_rect.png" alt="" />
				<h5 class="relative uppercase font-medium">logo</h5>
			</div>
		</header>
		<div>
			<div class="text-white">
				<div class="gradient_text">
					<h6>{nome},</h6>
					<h6>welcome</h6>
				</div>
				<div>
					<h6>click on to</h6>
					<h6>see your</h6>
					<h6>results</h6>
				</div>
			</div>
			<div>
				<button class="results_btn" @click="goToResults">
					<div class="results_btn_border"></div>
					<div class="results_btn_icon">
						<img class="absolute right-0 mr-1" src="@/assets/arrow_1.png" alt="" />
					</div>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.gradient_text {
	@apply text-6xl bg-clip-text text-transparent;
	background-image: linear-gradient(to right, #66aac2, #336478);
}

.results_btn {
	@apply relative rounded-full w-32 h-32 flex items-center justify-center;
	padding: 0.12rem;
}

.results_btn_icon {
	@apply relative rounded-full w-full h-full flex items-center bg-black;
}

.results_btn_border {
	@apply absolute rounded-full w-full h-full;
	background: linear-gradient(to right, #66aac2, #336478);
}
</style>
