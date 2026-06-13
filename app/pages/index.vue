<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import { Icon } from "@iconify/vue";
import {
    RangeCalendarCell,
    RangeCalendarCellTrigger,
    RangeCalendarGrid,
    RangeCalendarGridBody,
    RangeCalendarGridHead,
    RangeCalendarGridRow,
    RangeCalendarHeadCell,
    RangeCalendarHeader,
    RangeCalendarHeading,
    RangeCalendarNext,
    RangeCalendarPrev,
    RangeCalendarRoot,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
} from "reka-ui";
import { computed, ref } from "vue";

interface ServiceItem {
    id: number;
    title_ar: string;
    title_en: string;
    description_ar: string;
    description_en: string;
    short_description_ar: string;
    short_description_en: string;
    alias_name_ar: string;
    alias_name_en: string;
    image: string;
    icon: string;
}

interface ServicesApiResponse {
    status: number;
    services: ServiceItem[];
}

function isDateUnavailable(date: DateValue) {
    return date.day === 17 || date.day === 18;
}

const selectedRange = ref<{
    start: DateValue | undefined;
    end: DateValue | undefined;
}>({
    start: undefined,
    end: undefined,
});

const isLoading = ref(false);
const textValue = ref("");

const handlesubmit = () => {
    isLoading.value = true;
    return new Promise<void>((res) => setTimeout(res, 1000)).then(() => {
        isLoading.value = false;
    });
};

// header config
useSeoMeta({
    title: "Home - SmartZone",
    description: "Welcome to SmartZone, your gateway to innovative solutions.",
    keywords: "SmartZone, home, innovative solutions, technology, services",
});

// ==================== Fetching data from API ====================
const {
    data: servicesResponse,
    clear,
    execute,
    pending,
    error,
    refresh,
    status,
} = await useFetch<ServicesApiResponse>(
    "https://smart-zone.test/api/get-services",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        server: false,
        lazy: true,
    },
);

const services = computed(() => servicesResponse.value?.services ?? []);

const toServicePath = (slug: string) => `/services/${encodeURIComponent(slug)}`;

console.log("Fetched services:", servicesResponse);
console.log("Fetch status:", status.value);
console.log("Fetch error:", error.value);
</script>

<template>
    <main class="home-page">
        <UContainer class="mt-10">
            <section class="hero">
                <p class="eyebrow">SmartZone</p>
                <h1>Launch a real Reka UI dialog.</h1>
                <p class="lede">
                    This screen uses auto-imported Reka UI primitives from
                    <strong>reka-ui/nuxt</strong>.
                </p>
            </section>

            <section class="cta-card">
                <div>
                    <p class="card-label">Interactive Example</p>
                    <h2>Schedule a SmartZone walkthrough</h2>
                    <p class="card-copy">
                        The button below opens a modal built with Reka's dialog
                        primitives. It proves the module is installed and ready
                        for real interface work.
                    </p>
                </div>
            </section>

            <!-- -------------------- -->
            <SliderRoot :default-value="[25, 75]">
                <SliderTrack>
                    <SliderRange />
                </SliderTrack>
                <SliderThumb />
                <SliderThumb />
            </SliderRoot>

            <!-- -------------------- -->
            <!-- preview the cards into a responsive container and use the ui -->
            <div v-if="status === 'pending'">Loading ...</div>
            <div v-else-if="error" class="mt-10 text-sm text-error">
                Failed to load services.
            </div>
            <div v-else class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <NuxtLink
                    :to="toServicePath(service.alias_name_en)"
                    v-for="service in services"
                    :key="service.id"
                    class="rounded-lg bg-elevated/25 p-6"
                >
                    <h3 class="text-lg font-semibold mb-2">
                        {{ service.title_en }}
                    </h3>
                    <div
                        class="text-sm text-white service-description"
                        v-html="service.description_en"
                    ></div>
                </NuxtLink>
            </div>
        </UContainer>
    </main>
</template>

<style scoped>
.hero {
    margin-bottom: 2rem;
}

.eyebrow {
    margin: 0 0 0.5rem;
    color: #6ee7b7;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3.25rem);
    line-height: 1.05;
}

.lede {
    max-width: 60ch;
    color: #b8c3e0;
    font-size: 1.05rem;
}

.cta-card {
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem;
    border: 1px solid #243250;
    border-radius: 1.5rem;
    background:
        radial-gradient(
            circle at top right,
            rgba(87, 181, 231, 0.18),
            transparent 32%
        ),
        rgba(16, 24, 48, 0.82);
}

.card-label {
    margin: 0 0 0.5rem;
    color: #6ee7b7;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.cta-card h2 {
    margin: 0;
    font-size: clamp(1.4rem, 4vw, 2.2rem);
}

.card-copy {
    max-width: 58ch;
    margin: 0.75rem 0 0;
    color: #b8c3e0;
    line-height: 1.7;
}

.primary-button,
.secondary-button,
.icon-button {
    border: 0;
    cursor: pointer;
    font: inherit;
}

.primary-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem 1.2rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #6ee7b7, #2dd4bf);
    color: #08101f;
    font-weight: 700;
}

.primary-button.small {
    padding-inline: 1rem;
}

.service-description :deep(p) {
    margin: 0;
}

.secondary-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem 1.2rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: #e6ecff;
}

.dialog-overlay {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 1.25rem;
    background: rgba(3, 7, 18, 0.68);
    backdrop-filter: blur(8px);
}

.dialog-content {
    width: min(100%, 34rem);
    border: 1px solid #243250;
    border-radius: 1.5rem;
    background: #0d1530;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
    padding: 1.25rem;
}

.dialog-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
}

.dialog-title {
    margin: 0;
    font-size: 1.5rem;
}

.dialog-description {
    margin: 0.35rem 0 0;
    color: #9fb0d1;
    line-height: 1.6;
}

.icon-button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: #e6ecff;
    font-size: 1.4rem;
}

.dialog-body {
    display: grid;
    gap: 0.85rem;
    margin: 1.5rem 0;
}

.detail-row {
    display: grid;
    gap: 0.3rem;
    padding: 1rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.04);
}

.detail-label {
    color: #9fb0d1;
    font-size: 0.84rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

@media (max-width: 640px) {
    .dialog-actions {
        flex-direction: column-reverse;
    }

    .primary-button,
    .secondary-button {
        width: 100%;
    }
}
</style>
