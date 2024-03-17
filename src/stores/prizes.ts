import { defineStore } from 'pinia';
import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';

export const usePrizesStore = defineStore('prizes', () => {
  // Firebase data.
  const db = useFirestore();
  const prizes = useCollection(collection(db, 'prizes'));

  // Getters.
  const getPrizeById = (id) => {
    return prizes.value.find((prize) => prize.id === id);
  }

  // Actions.
  const createPrize = async (payload) => {
    return await addDoc(collection(db, 'prizes'), {
      ...payload,
    });
  }

  const updatePrize = async (id, payload) => {
    const prize = doc(db, 'prizes', id);
    if (prize) {
      await updateDoc(prize, payload);
    }
  }

  const deletePrize = async (id) => {
    const prize = doc(db, 'prizes', id);
    if (prize) {
      await deleteDoc(prize);
    }
  }

  return {
    prizes,
    getPrizeById,
    createPrize,
    updatePrize,
    deletePrize,
  };
})
