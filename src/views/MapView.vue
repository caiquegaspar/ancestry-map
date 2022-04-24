<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMapStore } from "../stores/mapData";
import { useRouter } from "vue-router";

const router = useRouter();
const mapStore = useMapStore();
const { mapData } = storeToRefs(mapStore);

console.log(mapData.value === mapStore.mapData);

onMounted(() => {
	const mySvg: SVGSVGElement = document.querySelector("svg")!;
	const svg_g: SVGGElement = mySvg.querySelector("g")!;

	mySvg.addEventListener("scroll", () => {
		svg_g.transform.baseVal.getItem(0).setScale(1, 1);
	});
});
</script>

<template>
	<div>
		<svg
			class="border-2 border-cyan-600 border-dashed rounded p-2 w-4/5"
			viewBox="0 0 898.9 582.2"
			preserveAspectRatio="xMidYMid slice"
		>
			<defs>
				<linearGradient id="MyGradient">
					<stop offset="0%" stop-color="#66aac2" />
					<stop offset="100%" stop-color="#336478" />
				</linearGradient>
			</defs>
			<g transform="scale(1) translate(0, 0)">
				<path
					v-for="country in mapData"
					:key="country.initials"
					:d="country.path"
					:data-code="country.initials"
					fill="#fff"
					fill-opacity="1"
					stroke="#ECECEC"
					stroke-width="0.8"
					fill-rule="evenodd"
				/>
			</g>
		</svg>
		<button class="results_btn" @click="router.push({ name: 'index' })">
			<div class="results_btn_border"></div>
			<div class="results_btn_icon">
				<img class="absolute right-0 mr-1 rotate-180" src="@/assets/arrow_1.png" alt="" />
			</div>
		</button>
	</div>
</template>

<style scoped>
path:hover {
	fill: url(#MyGradient);
}
</style>
