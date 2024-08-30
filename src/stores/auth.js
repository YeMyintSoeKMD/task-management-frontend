import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/assets/axios-config'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {

    // Router
    const router = useRouter()
   
    // Form Errors
    const inputErrors = ref({})
    const registerFormErr = ref('')
    const loginFormErr = ref('')


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

    /**
     * Register
    */
    const registerForm = reactive({
      'name': '',
      'email': '',
      'password': ''
    })
    const register = async () => {
      if (!navigator.onLine) {
        alert("Cannot register while offline. Please try again when you are online.");
        return;
      }
      try {
        const res = await axiosInstance.post("/register", registerForm);
        if(res.status === 201){
          // reset from
          registerForm.name = ''
          registerForm.email = ''
          registerForm.password = ''
          // reset errors
          inputErrors.value = {}
          registerFormErr.value = ""
          // redirect to login page
          router.push('/')
        }
      } catch (error) {
        registerFormErr.value = error.response.data.message
        inputErrors.value = error.response.data.error
      }
    }

    /**
     * Login
    */
    const loginForm = reactive({
      'email': '',
      'password': ''
    })
    const login = async () => {
      if (!navigator.onLine) {
        alert("Cannot login while offline. Please try again when you are online.");
        return;
      }
      try {
        const res = await axiosInstance.post("/login", loginForm);
        if(res.status === 201){
          // reset forms
          loginForm.email = ''
          loginForm.password = ''
          // reset errors
          loginFormErr.value = ''
          inputErrors.value = {}

          // store token in the localStorange
          localStorage.setItem('taskToken', res.data.data)

          // redirect to tasks
          router.push('/tasks')
        }
      } catch (error) {
        loginFormErr.value = error.response.data.message
        inputErrors.value = error.response.data.error
      }
    }

  /**
   * Logout
  */
  const logOut = async () => {
    if(!confirm('Are you sure to logout?')) {
      return
    }
    try {
      const res = await axiosInstance.post("/logout");
      if(res.status === 200){
        // remove token from the localStorage
        localStorage.removeItem('taskToken')
        // redirect to tasks
        router.push('/')
      }
    } catch (error) {
      console.error(error);
    }
  }
 

  return { 
    getAuthUser, 
    authUser, 

    inputErrors,
    registerFormErr,
    loginFormErr,

    registerForm, 
    register,

    loginForm, 
    login,

    logOut
  }
})
