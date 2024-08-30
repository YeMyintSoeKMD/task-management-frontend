import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/assets/axios-config'

export const useAuthStore = defineStore('auth', () => {
  
    /**
     * Get auth user
    */
    const authUser = ref({})
    const getAuthUser = async () => {
      try {
        const res = await axiosInstance.get(`/get-auth`);
        if(res.status === 200){
            authUser.value = res.data.data
        }
      } catch (error) {
        console.error(error);
      }
    }

  return { getAuthUser, authUser }
})
