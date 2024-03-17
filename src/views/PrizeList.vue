<template>
  <div class="container">
    <!-- Title & actions. -->
    <Toolbar class="toolbar">
      <template #start>
        <AppButton icon="pi pi-chevron-circle-left" label="Go back" outlined @click="backToWheel" />
      </template>
      <template #center>
        <h1>📝 Lottery list</h1>
      </template>
      <template #end>
        <AppButton icon="pi pi-plus" label="Create" @click="addPrize" />
      </template>
    </Toolbar>
    <!-- Prizes. -->
    <DataTable :value="prizes"
               data-key="id"
               v-model:filters="filters"
               filterDisplay="menu"
               :globalFilterFields="['mainTask', 'secondaryTask']"
               :style="{
                 background: 'white',
                 padding: '1.25em',
                 borderRadius: '6px',
               }"
               striped-rows
               paginator
               :rows="10">
      <Column field="mainTask" header="Main task" :header-style="{ background: 'white' }" style="width: 40%;" sortable />
      <Column field="secondaryTask" header="Secondary task" :header-style="{ background: 'white' }" style="width: 40%;" sortable />
      <Column :header-style="{ background: 'white' }" style="text-align: right;">
        <template #header>
          <InputText v-model="filters['global'].value" placeholder="Search" />
        </template>
        <template #body="slotProps">
          <AppButton icon="pi pi-pencil"
                     rounded
                     style="margin-right: 1em;"
                     @click="editPrize(slotProps.data.id)" />
          <AppButton icon="pi pi-trash"
                     rounded
                     severity="danger"
                     :disabled="slotProps.data.locked"
                     @click="preparePrizeForRemoval(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>
    <!-- Confirmation before deletion. -->
    <InfoDialog v-model:visible="showConfirmationDialog"
                header="Danger zone"
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
      <h3>Are you sure you want to delete this item?</h3>
      <template #footer>
        <AppButton label="Delete"
                   severity="danger"
                   @click="removePrize" />
        <AppButton label="Cancel"
                   outlined
                   @click="showConfirmationDialog = false" />
      </template>
    </InfoDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePrizesStore } from '@/stores/prizes.ts';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from 'primevue/api';

const store = usePrizesStore();
const router = useRouter();
const { prizes } = storeToRefs(store);
const { deletePrize } = store;

const showConfirmationDialog = ref(false);
const selectedPrizeId = ref('');
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Methods.
const backToWheel = () => {
  router.push('/');
}

const addPrize = () => {
  router.push('/add');
}

const editPrize = (id) => {
  router.push({ name: 'edit', params: { id } });
}

const preparePrizeForRemoval = (id) => {
  showConfirmationDialog.value = true;
  selectedPrizeId.value = id;
}

// Remove prize from Firebase.
const removePrize = async () => {
  try {
    await deletePrize(selectedPrizeId.value);
  } catch (e) {
    console.log(e);
  } finally {
    showConfirmationDialog.value = false;
  }
}
</script>
