<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import type { MapInterface } from "interfaces/map.interface";
import type { ApiReturnInterface } from "interfaces/api.interface";

defineProps<{
	mapData: MapInterface[];
	userData: ApiReturnInterface;
}>();

type startType = { x: number; y: number };

const max_scale: Ref<number> = ref(4);
const min_scale: Ref<number> = ref(1);
const scale: Ref<number> = ref(1);
const panning: Ref<boolean> = ref(false);
const transition: Ref<boolean> = ref(true);
const pointX: Ref<number> = ref(0);
const pointY: Ref<number> = ref(0);
const start: Ref<startType> = ref({ x: 0, y: 0 });
const xs: Ref<number> = ref(0);
const ys: Ref<number> = ref(0);
const delta: Ref<number> = ref(0);
const countryName: Ref<string> = ref("");
const pointerX: Ref<number> = ref(0);
const pointerY: Ref<number> = ref(0);

onMounted(() => {
	const mapSvg: SVGSVGElement = document.querySelector("#map_svg")!;
	const zoomArea: SVGGElement = document.querySelector("#zoom_area")!;

	const zoomInButton: SVGGElement = document.querySelector("#zoom_in")!;
	const zoomOutButton: SVGGElement = document.querySelector("#zoom_out")!;

	const mapPointers: DOMRect = mapSvg.getBoundingClientRect();
	const zoomPointers: DOMRect = zoomArea.getBoundingClientRect();

	zoomInButton.onclick = () => zoom("in");
	zoomOutButton.onclick = () => zoom("out");

	function setTransform() {
		let x = pointX.value;
		let y = pointY.value;
		let s = scale.value;

		zoomArea.style.transform =
			"translate(" + x + "px, " + y + "px) scale(" + s + ")";

		let mutablePointers: DOMRect = zoomArea.getBoundingClientRect();

		// pointerX.value = mutablePointers.left - mapPointers.left;
		pointerX.value = mapPointers.width / scale.value - mutablePointers.width;
		pointerY.value = mapPointers.height / scale.value - mutablePointers.height;
		// pointerY.value = mapPointers.height - mutablePointers.height;
	}

	function zoom(param: string) {
		param === "in" ? (scale.value *= 1.2) : (scale.value /= 1.2);

		scale.value = Math.max(
			min_scale.value,
			Math.min(max_scale.value, scale.value)
		);

		setTransform();
	}

	zoomArea.onmousedown = (e: MouseEvent) => {
		e.preventDefault();

		transition.value = false;

		start.value = { x: e.offsetX - pointX.value, y: e.offsetY - pointY.value };
		panning.value = true;
	};

	zoomArea.onmouseup = () => {
		transition.value = true;
		panning.value = false;
	};

	zoomArea.onmousemove = (e: MouseEvent) => {
		e.preventDefault();

		if (!panning.value) {
			return;
		}

		let posX: number = e.offsetX - start.value.x;
		let posY: number = e.offsetY - start.value.y;

		// let mutablePointers: DOMRect = zoomArea.getBoundingClientRect();
		// console.log({
		// 	event: e,
		// 	mapPointers: mapPointers,
		// 	mutablePointers: mutablePointers,
		// 	pointY: pointY.value,
		// 	pointX: pointX.value,
		// 	pointerY: pointerY.value,
		// 	pointerX: pointerX.value,
		// 	posX: posX,
		// 	posY: posY,
		// 	start_value_y: start.value.y,
		// 	scale: scale.value,
		// });

		pointX.value = Math.min(Math.max(posX, pointerX.value), 0);
		pointY.value = Math.min(Math.max(posY, pointerY.value), 0);

		setTransform();
	};

	zoomArea.onwheel = (e: WheelEvent) => {
		e.preventDefault();

		xs.value = (e.offsetX - pointX.value) / scale.value;
		ys.value = (e.offsetY - pointY.value) / scale.value;
		delta.value = e.deltaY ? -e.deltaY : e.deltaY;

		delta.value > 0 ? (scale.value *= 1.2) : (scale.value /= 1.2);

		let maxPosX: number = e.offsetX - xs.value * max_scale.value;
		let maxPosY: number = e.offsetY - ys.value * max_scale.value;

		let posX: number = e.offsetX - xs.value * scale.value;
		let posY: number = e.offsetY - ys.value * scale.value;

		pointX.value = Math.min(Math.max(posX, maxPosX), 0);
		pointY.value = Math.min(Math.max(posY, maxPosY), 0);

		scale.value = Math.max(
			min_scale.value,
			Math.min(max_scale.value, scale.value)
		);

		setTransform();
	};
});

function showTooltip(e: MouseEvent) {
	const tooltip: HTMLElement = document.getElementById("tooltip")!;
	const border: number = document.documentElement.clientWidth;
	const nearBorder: boolean = e.pageX + tooltip.clientWidth + 14 > border;

	tooltip.innerHTML = countryName.value;

	tooltip.style.left =
		e.pageX + (nearBorder ? -tooltip.clientWidth - 2 : 14) + "px";
	tooltip.style.top = e.pageY + 18 + "px";

	tooltip.classList.add("show");
}

function hideTooltip() {
	const tooltip: HTMLElement = document.getElementById("tooltip")!;
	tooltip.classList.remove("show");
}
</script>

<template>
	<div class="w-full h-full text-center md:text-left">
		<div class="gradient_text">my map</div>

		<div id="tooltip"></div>

		<svg
			id="map_svg"
			class="border-x-0 border-y-2 md:border-2 border-cyan-600 border-dashed rounded p-2 m-0 md:m-1"
			viewBox="0 0 898.9 582.2"
			preserveAspectRatio="xMidYMid slice"
		>
			<defs>
				<linearGradient id="hoverGradient">
					<stop offset="0%" stop-color="#66aac2" />
					<stop offset="100%" stop-color="#336478" />
				</linearGradient>

				<linearGradient
					v-for="area in userData.ancestry_info"
					:key="area.colors[0]"
					:id="`gradient${area.colors[0]}`"
				>
					<stop offset="0%" :stop-color="area.colors[0]" />
					<stop offset="100%" :stop-color="area.colors[1]" />
				</linearGradient>
			</defs>

			<g id="zoom_area" :class="transition ? 'transition duration-[200ms]' : ''">
				<rect width="100%" height="100%" />
				<path
					v-for="country in mapData"
					:key="country.initials"
					:d="country.path"
					:data-code="country.initials"
					:fill="country.highlighted ? `url(#gradient${country.colors[0]})` : '#fff'"
					fill-opacity="1"
					stroke="#ECECEC"
					stroke-width="0.8"
					fill-rule="evenodd"
					@mouseenter="countryName = country.name"
					@mousemove="showTooltip"
					@mouseout="hideTooltip"
				/>
			</g>

			<g id="zoom_buttons" transform="translate(10, 500)">
				<g id="zoom_in" class="cursor-pointer" fill="#fff" stroke="#000">
					<rect y="0" stroke-width="2" width="30" height="30" rx="5" />
					<line x1="5" x2="25" y1="15" y2="15" stroke-width="0.15rem" />
					<line x1="15" x2="15" y1="5" y2="25" stroke-width="0.15rem" />
				</g>
				<g id="zoom_out" class="cursor-pointer" fill="#fff" stroke="#000">
					<rect y="40" stroke-width="2" width="30" height="30" rx="5" />
					<line x1="5" x2="25" y1="55" y2="55" stroke-width="0.15rem" />
				</g>
			</g>
		</svg>
	</div>
</template>

<style scoped>
path:hover {
	fill: url(#hoverGradient);
}

#tooltip {
	@apply absolute invisible text-center text-white py-0.5;
	@apply px-1.5 rounded-md bg-neutral-600;
}

#tooltip.show {
	@apply visible;
}

.gradient_text {
	@apply inline-block text-5xl bg-clip-text text-transparent font-normal mb-5;
	@apply bg-gradient-to-r from-[#66aac2] to-[#336478];
}
</style>
