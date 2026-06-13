<script setup lang="ts">
import { ConfigProvider } from "reka-ui";
</script>

<template>
    <ConfigProvider>
        <div>
            <NuxtRouteAnnouncer />
            <!-- <NuxtWelcome /> -->
            <AppNavbar />
            <UApp>
                <NuxtPage />
            </UApp>
        </div>
    </ConfigProvider>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}

.rotate-enter-active,
.rotate-leave-active {
    transition: all 0.3s;
}
.rotate-enter-from,
.rotate-leave-to {
    opacity: 0;
    transform: rotateY(60deg);
}
</style>
