<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
</script>
<template>
    <div>
        <RouterView></RouterView>
    </div>
</template>
