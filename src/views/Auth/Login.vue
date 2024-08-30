<template>
    <div>
        <h1 class="text-2xl font-bold mb-3">Log in</h1>
        <p class="text-sm text-gray-600 mb-8">Welcome back! Please enter your detail.</p>

        <div v-if="loginFormErr"
            class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div>{{ loginFormErr }}</div>
        </div>
        <form @submit.prevent="login">
            <div class="mb-5">
                <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email</label>
                <input type="email" v-model="loginForm.email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email" required />
                <div v-if="inputErrors.email" class="mt-1 text-pink-400 text-sm"> {{ inputErrors.email[0] }}</div>
            </div>
            <div class="mb-5">
                <label for="password"
                    class="block text-sm font-medium text-gray-900 mb-2 dark:text-white">Password</label>
                <input type="password" v-model="loginForm.password" id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
                <div v-if="inputErrors.password" class="mt-1 text-pink-400 text-sm"> {{ inputErrors.password[0] }}</div>
            </div>
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign
                In</button>
            <p class="text-sm text-center mt-6">Don't have an account?
                <RouterLink to="/register" class="ms-2 text-blue-800 font-semibold underline">Sign up</RouterLink>
            </p>
        </form>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter()

/* Using auth store */
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()
const { loginFormErr, inputErrors, loginForm } = storeToRefs(authStore)
const { login } = authStore

onMounted(() => {
    const token = localStorage.getItem('taskToken');
    if (token) {
        router.push('/tasks')
    }
})
</script>

<style lang="scss" scoped></style>