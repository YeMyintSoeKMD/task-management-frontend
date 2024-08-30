<template>
    <main class="p-5">
        <Navbar />
        <section id="task" class="">
            <div class="container mx-auto">
                <RouterLink to="/tasks"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-full sm:rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                    Back
                </RouterLink>
                <div class="mb-3"></div>
                <div v-if="task && task.title"
                    class="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <h2 class="text-xl">{{ task.title }}</h2>
                    <p>{{ task.description }}</p>
                </div>
                <div v-else>
                    <p>You're offline. The task is unavailable.</p>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const store = useTaskStore()
const { task } = storeToRefs(store)
const { getTask } = store

const props = defineProps({
    id: String
})

onMounted(() => {
    getTask(props.id)
})


</script>

<style lang="scss" scoped></style>