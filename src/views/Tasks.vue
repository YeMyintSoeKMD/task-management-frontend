<template>
    <main>
        <Navbar />
        <section id="tasks" class="mt-24">
            <div class="container mx-auto px-5">
                <!-- Filtering  -->
                <div class="flex gap-x-1 sm:gap-x-5 lg:w-2/3 xl:w-1/3">
                    <select @change="filteredByType"
                        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Type Filter</option>
                        <option value="active">Active</option>
                        <option value="trashed">Trashed</option>
                    </select>
                    <select @change="filteredByCategory"
                        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Category Filter</option>
                        <template v-for="category in categories" :key="category.id">
                            <option :value="category.id">{{ category.name }}</option>
                        </template>
                    </select>
                    <select @change="sortingByAD"
                        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="desc">DESC</option>
                        <option value="asc">ASC</option>
                    </select>
                </div>

                <!-- Tasks List -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div v-for="task in filteredTasks" :key="task.id"
                        class="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                        :class="{ 'bg-pink-50 border-0': task.deleted_at }">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                            task.title }}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ task.description }}</p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-x-3">
                                <button v-if="!task.deleted_at" @click="openEditModal(task)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="size-6 text-blue-700 hover:size-7 transition-all duration-100"
                                        role="button">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button @click="deleteTask(task.id)">
                                    <svg v-if="task.deleted_at" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="size-6 text-pink-700 hover:size-7 transition-all duration-100"
                                        role="button">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="size-6 text-pink-700 hover:size-7 transition-all duration-100">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <RouterLink :to="{ name: 'task', params: { id: task.id } }"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-full sm:rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <!-- Task Edit Modal  -->
                <div v-if="isModalVisible"
                    class="fixed inset-0 z-40 bg-gray-700 bg-opacity-50 flex justify-center items-center">
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
                                Edit Task
                            </h5>
                            <form @submit.prevent="updateTask">
                                <div class="mb-3">
                                    <label for="title"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" v-model="editForm.title" id="title"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                </div>
                                <div class="mb-3">
                                    <label for="description"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea v-model="editForm.description" id="description" rows="4"
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="title"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due
                                        Date</label>
                                    <input type="text" v-model="editForm.due_date" id="title"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                </div>
                                <div class="mb-3">
                                    <label for="title"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <input type="text" v-model="editForm.category_id" id="title"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                </div>
                                <button type="submit"
                                    class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Update</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { storeToRefs } from 'pinia'
import { ref, onMounted, reactive, onUpdated } from 'vue';
import { RouterLink } from 'vue-router';

/* Using auth store */
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()
const { getAuthUser } = authStore
const { authUser } = storeToRefs(authStore)

/* Using task store */
import { useTaskStore } from '@/stores/task';
const taskStore = useTaskStore()
const { getTasks, deleteTask, updateTask, filteredByCategory, filteredByType, sortingByAD } = taskStore
const { editId, editForm, filteredTasks } = storeToRefs(taskStore)

/* Using category store */
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
const { getCategories } = categoryStore
const { categories } = storeToRefs(categoryStore)


// Custom modal
const isModalVisible = ref(false);
const openEditModal = (task) => {
    editId.value = task.id
    editForm.value.title = task.title
    editForm.value.description = task.description
    editForm.value.due_date = task.due_date
    editForm.value.category_id = task.category_id

    isModalVisible.value = true;
};
const closeModal = () => {
    isModalVisible.value = false;
};

onMounted(() => {
    getAuthUser()
    getTasks()
    getCategories()
})

onUpdated(() => {
    if (editId.value === null) {
        closeModal()
    }
})
</script>

<style lang="scss" scoped></style>