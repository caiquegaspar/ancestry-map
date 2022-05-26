<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMapStore } from "stores/mapData";
import { storeToRefs } from "pinia";

const router = useRouter();
const mapStore = useMapStore();
const { userData } = storeToRefs(mapStore);

const goToResults = () =>
	router.push({
		name: "map",
	});
</script>

<template>
	<div class="relative w-screen h-screen">
		<div class="absolute flex justify-end h-full w-full">
			<div class="relative">
				<div
					class="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#000] to-[#0000] -translate-x-5"
				></div>
				<img class="h-full object-cover" src="../assets/dna_molecule.gif" alt="Dna Molecule" />
			</div>
		</div>
		<header class="text-black p-12">
			<div class="relative flex items-center justify-center h-6 w-24">
				<img class="absolute h-full w-full" src="@/assets/logo_rect.png" alt="" />
				<h5 class="relative uppercase font-medium">logo</h5>
			</div>
		</header>
		<div class="flex flex-1 flex-col pt-[8%] pl-[15%]">
			<div class="text-white relative">
				<div class="gradient_text">
					<div>{{ userData.personal_info.name }},</div>
					<div>welcome</div>
				</div>
				<div class="text-4xl">
					<div>click on to</div>
					<div>see your</div>
					<div>results</div>
				</div>
				<div class="absolute -bottom-[70px] left-[130px]">
					<button class="results_btn" @click="goToResults">
						<div class="results_btn_border"></div>
						<div class="results_btn_icon">
							<img class="absolute right-0 mr-1" src="@/assets/arrow_1.png" alt="" />
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.gradient_text {
	@apply inline-block text-7xl bg-clip-text text-transparent font-normal mb-4;
	@apply bg-gradient-to-r from-[#66aac2] to-[#336478];
}

.gradient_text div {
	@apply font-normal;
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
	@apply bg-gradient-to-r from-[#66aac2] to-[#336478];
}
</style>
