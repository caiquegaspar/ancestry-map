<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMapStore } from "stores/mapData";
import { storeToRefs } from "pinia";

import MapComponent from "components/MapComponent.vue";
import GraphsComponent from "components/GraphsComponent.vue";

const router = useRouter();
const mapStore = useMapStore();
const { userData, mapData } = storeToRefs(mapStore);
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<header
			class="flex flex-col md:flex-row items-center justify-between text-black w-full pt-4"
		>
			<div class="flex items-center justify-center w-1/6">
				<div class="logo relative flex items-center justify-center h-6 w-24">
					<img class="absolute h-full w-full" src="@/assets/logo_rect.png" alt="" />
					<h5 class="relative uppercase font-medium">logo</h5>
				</div>
			</div>

			<div class="flex flex-1 items-center justify-around pt-10">
				<div
					class="relative avatar_icon flex flex-col md:flex-row items-center justify-center text-white"
				>
					<div class="relative flex w-16 h-16 md:w-12 md:h-12">
						<div
							class="absolute z-10 -left-[3px] rounded-full w-full h-full bg-gradient-to-r from-[#66aac2] to-[#336478]"
						></div>
						<img
							class="rounded-full w-full z-20"
							src="https://cdn.quasar.dev/img/boy-avatar.png"
							alt=""
						/>
					</div>
					<div class="ml-2 mt-2 md:mt-0 text-xl md:text-lg">
						{{ userData.personal_info.name }}
					</div>
				</div>

				<div class="share_buttons hidden md:flex text-white">
					<button class="print_button">
						<img class="w-6" src="@/assets/print.svg" alt="" />
						<div class="ml-1 text-lg">Print</div>
					</button>
					<button class="share_button">
						<img class="w-6" src="@/assets/share.svg" alt="" />
						<div class="ml-1 text-lg">Share</div>
					</button>
				</div>
			</div>

			<div class="hidden md:flex items-center justify-center w-1/6">
				<div class="back_button absolute right-0 top-0">
					<div class="relative overflow-hidden w-32 h-32">
						<button class="results_btn" @click="router.push({ name: 'index' })">
							<div class="results_btn_border"></div>
							<div class="results_btn_icon">
								<div class="absolute flex flex-col items-end left-3 bottom-9">
									<div class="text-white text-xl">back</div>
									<img
										class="rotate-180 mr-1 scale-9"
										src="@/assets/arrow_1.png"
										alt=""
									/>
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
		</header>

		<div class="graphs_container">
			<GraphsComponent :user-data="userData" class="w-full md:w-1/4" />
			<MapComponent :map-data="mapData" class="w-full md:w-4/6" />
		</div>

		<footer class="block md:hidden">
			<div class="share_buttons flex text-white mb-10">
				<button class="print_button">
					<img class="w-6" src="@/assets/print.svg" alt="" />
					<div class="ml-1 text-lg">Print</div>
				</button>
				<button class="share_button">
					<img class="w-6" src="@/assets/share.svg" alt="" />
					<div class="ml-1 text-lg">Share</div>
				</button>
			</div>

			<div class="flex items-center justify-center w-full mb-10">
				<div class="back_button">
					<div class="relative overflow-hidden w-32 h-32">
						<button
							class="rounded-full w-32 h-32 flex items-center justify-center p-[0.22rem]"
							@click="router.push({ name: 'index' })"
						>
							<div class="results_btn_border"></div>
							<div class="results_btn_icon">
								<div class="absolute flex flex-col items-end left-5 bottom-11">
									<div class="text-white text-xl">back</div>
									<img
										class="rotate-180 mr-1 scale-9"
										src="@/assets/arrow_1.png"
										alt=""
									/>
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<style scoped>
.results_btn {
	@apply absolute -right-9 -top-9 rounded-full w-32 h-32;
	@apply flex items-center justify-center p-[0.22rem];
}

.results_btn_icon {
	@apply relative rounded-full w-full h-full flex items-center bg-[#336478];
}

.results_btn_border {
	@apply absolute rounded-full w-full h-full;
	@apply bg-gradient-to-r from-[#66aac2] to-[#336478];
}

.print_button,
.share_button {
	@apply flex items-center justify-center border-2 border-white rounded-lg;
	@apply w-28 h-8 mx-1;
}

.graphs_container {
	@apply flex flex-col-reverse items-center justify-center w-full px-0 pt-10;
	@apply md:flex-row md:items-start md:justify-around md:px-4 md:pt-12;
}
</style>
