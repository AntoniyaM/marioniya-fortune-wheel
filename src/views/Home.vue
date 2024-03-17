<template>
  <div class="container">
    <Toolbar class="toolbar">
      <template #start>
        <AppButton icon="pi pi-list" label="View all" @click="viewAllPrizes" />
      </template>
      <template #center>
        <h1>Spin the wheel</h1>
      </template>
      <template #end>
        <AppButton icon="pi pi-plus" label="Create" @click="addPrize" />
      </template>
    </Toolbar>
    <Wheel />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Wheel from '@/components/Wheel.vue';

const router = useRouter();
const addPrize = () => {
  router.push('/add');
}
const viewAllPrizes = () => {
  router.push('/list');
}
</script>
