<template>
    <main>
        <!-- Task Add Modal  -->
        <div v-if="isModalVisible"
            class="fixed inset-0 z-40 bg-gray-700 bg-opacity-50 flex justify-center items-center px-5 md:px-0">
            <div class="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" @click="closeModal"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 mt-10">
                    <h5 id="drawer-right-label"
                        class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                        Add Task
                    </h5>
                    <form @submit.prevent="storeTask(authUser.id)">
                        <div class="mb-3">
                            <label for="title"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" v-model="form.title" id="title"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea v-model="form.description" id="description" rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due
                                Date</label>
                            <input type="date" v-model="form.due_date" id="title"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="title"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select v-model="form.category_id" id="category" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Choose a category</option>
                                <template v-for="category in categories" :key="category.id">
                                    <option :value="category.id">{{ category.name }}</option>
                                </template>
                            </select>
                        </div>
                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Create</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav
            class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="container flex flex-wrap items-center justify-between mx-auto p-5">
                <!-- Left - logo  -->
                <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/icons/icon-72x72.png" class="h-8" alt="Flowbite Logo">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Task</span>
                </RouterLink>
                <!-- Right - Icons -->
                <div class="flex items-center md:order-2 space-x-5 rtl:space-x-reverse">
                    <button @click="logOut">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </button>
                    <button type="button" @click="openEditModal"
                        class="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </main>
</template>

<script setup>
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

/* Using auth store */
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()
const { authUser } = storeToRefs(authStore)
const { getAuthUser, logOut } = authStore

/* Using category store */
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
const { getCategories } = categoryStore
const { categories } = storeToRefs(categoryStore)

/* Using task store */
const taskStore = useTaskStore()
const { form } = storeToRefs(taskStore)
const { storeTask } = taskStore

// Custom modal
const isModalVisible = ref(false);
const openEditModal = (task) => {
    isModalVisible.value = true;
};
const closeModal = () => {
    isModalVisible.value = false;
};

onMounted(() => {
    getAuthUser()
})


</script>

<style lang="scss" scoped></style>