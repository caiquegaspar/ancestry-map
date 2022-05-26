<script setup lang="ts">
import { RouterView } from "vue-router";
import { useMapStore } from "stores/mapData";
import { onBeforeMount, ref } from "vue";

const mapStore = useMapStore();

const loading = ref(true);

onBeforeMount(
	async () => await mapStore.getUserData().then(() => (loading.value = false))
);
</script>

<template>
	<div class="bg-black w-full h-full min-w-screen min-h-screen">
		<RouterView v-if="!loading" v-slot="{ Component }">
			<Transition name="scale" mode="out-in">
				<KeepAlive>
					<component :is="Component" />
				</KeepAlive>
			</Transition>
		</RouterView>
	</div>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
	transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
	opacity: 0;
	transform: scale(0.9);
}
</style>
