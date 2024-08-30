import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/assets/axios-config'

export const useCategoryStore = defineStore('category', () => {
  
  /* Get categories */
  const categories = ref([])
  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      if(res.status === 200){
        categories.value = res.data.data
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return { 
    getCategories,
    categories
  }
})
