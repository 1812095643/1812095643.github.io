<template>
  <AppLayout :active="active">
    <router-view v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </router-view>
  </AppLayout>

  <!-- Mounts common layout with router-based pages -->
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppLayout from "./components/AppLayout.vue";

const route = useRoute();
const active = computed(() => {
  const name = route.name as string | undefined;
  const tabs = ["home", "work", "tool", "blog", "book", "about"] as const;
  return (tabs as readonly string[]).includes(name || "")
    ? (name as (typeof tabs)[number])
    : "home";
});
</script>

<style scoped>
/* Root shell for SPA */

/* 页面过渡动画 */
.page-enter-active {
  transition: opacity 0.4s ease;
}

.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
