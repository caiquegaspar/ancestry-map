<script setup lang="ts">
import type { ApiReturnInterface } from "interfaces/api.interface";
import { onMounted, ref, type Ref } from "vue";

defineProps<{
	userData: ApiReturnInterface;
}>();

const animatedNumber: Ref<number> = ref(0);

const animateNumbers = (num: number = 100) => {
	animatedNumber.value++;

	if (animatedNumber.value < num) setTimeout(() => animateNumbers(), 25);
};

console.log();

onMounted(() => setTimeout(() => animateNumbers(), 500));
</script>

<template>
	<div
		class="flex flex-col mb-10 mt-10 md:mt-0 items-center justify-center text-white"
	>
		<div class="graph_title">
			<div class="graph_title_border"></div>
			<div class="graph_title_text">Ethnicity Estimate</div>
		</div>
		<div class="graph_tree pl-4 z-[9]">
			<div
				v-for="(region, index) in userData.ancestry_info"
				:key="region.code"
				class="branch relative"
			>
				<div
					v-if="index > 0"
					class="absolute w-8 h-32 border-dashed border-l-2 -top-32"
				></div>
				<div class="w-8 h-8 border-dashed border-l-2 border-b-2"></div>
				<div class="flex">
					<div class="w-8 h-8 relative">
						<div class="flex items-center justify-start absolute left-[24px] -top-3">
							<div class="rounded-full w-4 h-4 bg-[#66aac2]"></div>
							<div class="w-40 ml-2">{{ region.name }}</div>
						</div>
					</div>
					<div class="w-12 h-[75px] border-dashed border-l-2 border-b-2"></div>
					<div class="results_circle">
						<div class="results_circle_border"></div>
						<div class="results_circle_text">
							{{
								animatedNumber >= region.percentage
									? region.percentage
									: animatedNumber
							}}%
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.graph_title {
	@apply relative flex items-center justify-center border-white rounded-lg;
	@apply w-44 h-8 text-center p-[1px] mr-3;
}

.graph_title_border {
	@apply absolute z-10 rounded-lg w-full h-full mx-1;
	@apply bg-gradient-to-r from-[#66aac2] to-[#336478];
}

.graph_title_text {
	@apply relative text-lg z-20 rounded-lg w-full h-full bg-black;
}

.results_circle {
	@apply relative rounded-full w-28 h-28 flex items-center justify-center;
	@apply mt-5 p-[0.12rem];
}

.results_circle_text {
	@apply relative rounded-full w-full h-full flex items-center justify-center;
	@apply bg-black text-3xl;
}

.results_circle_border {
	@apply absolute rounded-full w-full h-full;
	@apply bg-gradient-to-r from-[#66aac2] to-[#336478];
}
</style>
