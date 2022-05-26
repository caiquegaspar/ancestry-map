<!-- <script setup lang="ts">
import { onMounted} from "vue";
import { storeToRefs } from "pinia";
import { useMapStore } from "../stores/mapData";
import { useRouter } from "vue-router";

const router = useRouter();
const mapStore = useMapStore();
const { mapData } = storeToRefs(mapStore);

onMounted(() => {
	for (const divMain of document.getElementsByClassName("map_svg")) {
		// drag the section
		for (const divSection of divMain.getElementsByClassName("zoom_area")) {
			// when mouse is pressed store the current mouse x,y
			let previousX: number, previousY: number;

			divSection.onmousedown = (event: MouseEvent) => {
				previousX = event.pageX;
				previousY = event.pageY;
			};

			// when mouse is moved, scrollBy() the mouse movement x,y
			divSection.onmousemove = (event: MouseEvent) => {
				// only do this when the primary mouse button is pressed (event.buttons = 1)
				if (event.buttons) {
					let dragX = 0;
					let dragY = 0;
					// skip the drag when the x position was not changed
					if (event.pageX - previousX !== 0) {
						dragX = previousX - event.pageX;
						previousX = event.pageX;
					}
					// skip the drag when the y position was not changed
					if (event.pageY - previousY !== 0) {
						dragY = previousY - event.pageY;
						previousY = event.pageY;
					}
					// scrollBy x and y
					if (dragX !== 0 || dragY !== 0) {
						divMain.scrollBy(dragX, dragY);
					}
				}
			};
		}

		// zoom in/out on the section
		let scale = 1;
		const factor = 0.05;
		const max_scale = 4;

		divMain.onwheel = (e: WheelEvent) => {
			// preventDefault to stop the onselectionstart event logic
			for (const divSection of divMain.getElementsByClassName("zoom_area")) {
				e.preventDefault();
				var delta = e.delta || e.wheelDelta;
				if (delta === undefined) {
					//we are on firefox
					delta = e.originalEvent.detail;
				}
				delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency
				let offset = { x: divMain.scrollLeft, y: divMain.scrollTop };
				let image_loc = {
					x: e.pageX + offset.x,
					y: e.pageY + offset.y,
				};

				let zoom_point = { x: image_loc.x / scale, y: image_loc.y / scale };

				// apply zoom
				scale += delta * factor * scale;
				scale = Math.max(1, Math.min(max_scale, scale));

				let zoom_point_new = { x: zoom_point.x * scale, y: zoom_point.y * scale };

				let newScroll = {
					x: zoom_point_new.x - e.pageX,
					y: zoom_point_new.y - e.pageY,
				};

				divSection.style.transform = `scale(${scale}, ${scale})`;
				divMain.scrollTop = newScroll.y;
				divMain.scrollLeft = newScroll.x;
			}
		};
	}
});
</script>

<template>
	<div>
		<svg
			id="map_svg"
			class="map_svg border-2 border-cyan-600 border-dashed rounded p-2 w-4/5"
			viewBox="0 0 898.9 582.2"
			preserveAspectRatio="xMidYMid slice"
		>
			<defs>
				<linearGradient id="MyGradient">
					<stop offset="0%" stop-color="#66aac2" />
					<stop offset="100%" stop-color="#336478" />
				</linearGradient>
			</defs>
			<g class="zoom_area" id="zoom_area">
				<rect width="100%" height="100%" />
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
				<img
					class="absolute right-0 mr-1 rotate-180"
					src="@/assets/arrow_1.png"
					alt=""
				/>
			</div>
		</button>
	</div>
</template>

<style scoped>
path:hover {
	fill: url(#MyGradient);
}
</style> -->
