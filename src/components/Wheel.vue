<template>
  <div class="wheel">
    <FortuneWheel v-if="canvasPrizes.length"
                  :canvas="canvasOptions"
                  :prizes="canvasPrizes"
                  use-weight
                  @rotateEnd="displayPrize"
    />
  </div>
  <InfoDialog v-model:visible="showMessage"
              header="You're up!"
              modal
              dismissable-mask
              :style="{ minWidth: '20em' }"
              :pt="{
                root: 'border-none',
                mask: {
                  style: 'backdrop-filter: blur(2px)'
                }
              }"
  >
    <h3>{{ selectedPrize.mainTask }}</h3>
    OR
    <h3>{{ selectedPrize.secondaryTask }}</h3>
    <h2>🤔</h2>
  </InfoDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePrizesStore } from '@/stores/prizes.ts';
import { storeToRefs } from 'pinia';
import FortuneWheel from 'vue-fortune-wheel';

const store = usePrizesStore();
const { prizes } = storeToRefs(store);
const selectedPrize = ref({
  mainTask: '',
  secondaryTask: '',
});
const showMessage = ref(false);

const canvasOptions = {
  radius: 300,
  btnWidth: 120,
  borderColor: '#2e2261',
  borderWidth: 4,
  lineHeight: 30,
};

const canvasColors = [
  '#c2b5fa',
  '#a895f8',
  '#8d74f5',
  '#6147cf',
  '#503baa',
];

// Assign colors to prizes.
const canvasPrizes = computed(() => {
  return prizes.value.map((item, key) => {
    return {
      id: item.id,
      name: '🫣',
      value: item,
      color: '#fff',
      bgColor: canvasColors[key] ?? canvasColors[key%canvasColors.length],
      weight: 1,
    }
  })
});

// Methods.
const displayPrize = (prize) => {
  selectedPrize.value = prize.value;
  showMessage.value = true;
}
</script>
