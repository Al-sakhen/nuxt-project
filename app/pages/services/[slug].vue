<script setup lang="ts">
interface ServiceItem {
	id: number;
	title_en: string;
	description_en: string;
	alias_name_en: string;
}

interface ServiceApiResponse {
	status: number;
	service?: ServiceItem;
	data?: ServiceItem;
}

const route = useRoute();
const slug = computed(() => decodeURIComponent(String(route.params.slug ?? "")));
const serviceEndpoint = computed(
	() => `https://smart-zone.test/api/get-service/${encodeURIComponent(slug.value)}`,
);

const { data, error, status } = await useFetch<ServiceApiResponse>(
	serviceEndpoint,
	{
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		server: false,
		lazy: true,
	},
);

const service = computed(() => data.value?.service ?? data.value?.data ?? null);

useSeoMeta({
	title: computed(() =>
		service.value ? `${service.value.title_en} - SmartZone` : "Service - SmartZone",
	),
});
</script>

<template>
	<main class="service-page">
		<UContainer class="mt-10">
			<NuxtLink to="/" class="back-link">Back to services</NuxtLink>

			<div v-if="status === 'pending'">Loading service...</div>
			<div v-else-if="error" class="text-error">Failed to load service.</div>
			<section v-else-if="service" class="service-card">
				<h1 class="service-title">{{ service.title_en }}</h1>
				<div class="service-body" v-html="service.description_en"></div>
			</section>
			<div v-else class="text-muted">Service not found.</div>
		</UContainer>
	</main>
</template>

<style scoped>
.service-page {
	padding-bottom: 2rem;
}

.back-link {
	display: inline-flex;
	margin-bottom: 1rem;
	color: #6ee7b7;
}

.service-card {
	border: 1px solid #243250;
	border-radius: 1rem;
	background: rgba(16, 24, 48, 0.82);
	padding: 1.25rem;
}

.service-title {
	margin: 0 0 0.75rem;
}

.service-body :deep(p) {
	margin: 0;
}
</style>
