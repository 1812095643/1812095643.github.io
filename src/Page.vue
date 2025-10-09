<template>
  <AppLayout :active="active">
    <PullToRefresh :on-refresh="handleRefresh">
      <router-view v-slot="{ Component }">
        <PageTransition>
          <component :is="Component" :key="$route.fullPath" />
        </PageTransition>
      </router-view>
    </PullToRefresh>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppLayout from "./components/AppLayout.vue";
import PageTransition from "./components/PageTransition.vue";
import PullToRefresh from "./components/PullToRefresh.vue";
import { useSwipeGesture } from "./composables/useSwipeGesture";

const route = useRoute();
const router = useRouter();

const active = computed(() => {
  const name = route.name as string | undefined;
  const tabs = ["home", "work", "tool", "blog", "book", "about"] as const;
  return (tabs as readonly string[]).includes(name || "")
    ? (name as (typeof tabs)[number])
    : "home";
});

// 启用滑动手势切换页面（仅移动端）
useSwipeGesture({
  enableRouteSwipe: true,
  threshold: 80
});

// 下拉刷新处理
const handleRefresh = async () => {
  // 刷新当前页面
  await new Promise(resolve => setTimeout(resolve, 1000));
  router.go(0);
};
</script>

<style scoped>
/* Root shell for SPA */
</style>
