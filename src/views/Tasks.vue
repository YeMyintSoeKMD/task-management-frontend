<template>
    <main>
        <Navbar />
        <section id="tasks" class="mt-24">
            <div class="container mx-auto px-5">
                <!-- Filtering  -->
                <div class="flex gap-x-1 sm:gap-x-5 lg:w-2/3 xl:w-1/3">
                    <select id="default"
                        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="all">All</option>
                        <option value="trashed">Trashed</option>
                    </select>
                    <select id="default"
                        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="cat1">Cat 1</option>
                        <option value="cat2">cat 2</option>
                        <option value="cat3">cat 3</option>
                    </select>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div v-for="task in tasks.data" :key="task.id"
                        class="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                            task.title }}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ task.description }}</p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-x-3">
                                <button @click="test">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="size-6 text-blue-700 hover:size-7 transition-all duration-100"
                                        role="button">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <svg xmlns="http://www.w3.org/2000/svg" @click="deleteTask(task.id)" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="size-6 text-red-700 hover:size-7 transition-all duration-100" role="button">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
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
            </div>
        </section>
    </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const store = useTaskStore()
const { getTasks, deleteTask } = store
const { tasks } = storeToRefs(store)

onMounted(() => {
    getTasks()
})
</script>

<style lang="scss" scoped></style>