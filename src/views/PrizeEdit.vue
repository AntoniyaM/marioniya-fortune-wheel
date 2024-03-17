<template>
  <div class="container container--narrow">
    <ContentCard class="content-card">
      <template #header>
        <h1>Edit item</h1>
      </template>
      <template #content>
        <Panel>
          <template #header>
            <strong>Keep it simple 😜</strong>
          </template>
          <form id="editForm" @submit.prevent="savePrize">
            <div v-if="formMessage" class="form-message">
              {{ formMessage }}
            </div>
            <AppTextarea v-model="updatedPrize.mainTask"
                         placeholder="Enter option #1"
                         autofocus
                         required
                         rows="6" />
            <strong>OR</strong>
            <AppTextarea v-model="updatedPrize.secondaryTask"
                         placeholder="Enter option #2"
                         required
                         rows="6" />
          </form>
          <template #footer>
            <AppButton
              label="Save item"
              type="submit"
              form="editForm"
              :icon="`pi pi-${loading ? 'spinner' : 'check'}`" />
            <AppButton
              label="Cancel"
              severity="danger"
              outlined
              @click="cancel"
              icon="pi pi-times" />
          </template>
        </Panel>
      </template>
    </ContentCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePrizesStore } from '@/stores/prizes';

const router = useRouter();
const { getPrizeById, updatePrize } = usePrizesStore();

// Loading state.
const loading = ref(false);

// Current prize open for editing.
const prize = computed(() => {
  return getPrizeById(router.currentRoute.value.params?.id);
});

// Object to v-model.
const updatedPrize = ref({
  ...prize.value,
});

// Form validation.
const formMessage = ref('');
const validateInput = () => {
  formMessage.value = '';

  if (updatedPrize.value.mainTask.trim() === updatedPrize.value.secondaryTask.trim()) {
    formMessage.value = 'Nice try.. 😉'
    return false;
  }

  return true;
}

// Save prize to Firebase.
const savePrize = async () => {
  try {
    if (validateInput()) {
      loading.value = true;
      await updatePrize(prize.value?.id, updatedPrize.value);
      loading.value = false;
      await router.push('/list');
    }
  } catch (e) {
    console.log(e);
  }
}

// Cancel.
const cancel = () => {
  router.back();
}
</script>
