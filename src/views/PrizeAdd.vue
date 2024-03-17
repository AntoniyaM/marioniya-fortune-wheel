<template>
  <div class="container container--narrow">
    <ContentCard class="content-card">
      <template #header>
        <h1>Add a new item</h1>
      </template>
      <template #content>
        <Panel>
          <template #header>
            <strong>Keep it simple 😜</strong>
          </template>
          <form id="addForm" @submit.prevent="savePrize">
            <div v-if="formMessage" class="form-message">
              {{ formMessage }}
            </div>
            <AppTextarea v-model="newPrize.mainTask"
                         placeholder="Enter option #1"
                         autofocus
                         required
                         rows="6" />
            <strong>OR</strong>
            <AppTextarea v-model="newPrize.secondaryTask"
                         placeholder="Enter option #2"
                         required
                         rows="6" />
          </form>
          <template #footer>
            <AppButton
              label="Save item"
              type="submit"
              form="addForm"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePrizesStore } from '@/stores/prizes';

const router = useRouter();
const { createPrize } = usePrizesStore();

// Loading state.
const loading = ref(false);

// Object to v-model.
const newPrize = ref({
  mainTask: '',
  secondaryTask: '',
  locked: false,
});

// Form validation.
const formMessage = ref('');
const validateInput = () => {
  formMessage.value = '';

  if (newPrize.value.mainTask.trim() === newPrize.value.secondaryTask.trim()) {
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
      let result = await createPrize(newPrize.value);
      if (result?.id) {
        loading.value = false;
        await router.push('/list');
      }
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
