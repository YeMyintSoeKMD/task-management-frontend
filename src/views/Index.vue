<template>
    <div>
        <div class="grid lg:grid-cols-2">
            <div class="h-screen flex items-center justify-center">
                <div class="xl:basis-[54%] lg:basis-2/3 sm:basis-2/3 basis-4/5">
                    <div class="flex items-center gap-x-1 mb-12">
                        <img src="/icons/icon-72x72.png" class="w-6 h-6" />
                        <h1 class="font-bold">PWA Task</h1>
                    </div>
                    <RouterView />
                </div>
            </div>

            <div class="h-screen lg:flex hidden items-center justify-center bg-blue-600">
                <img src="/img/login-register.png" />
            </div>
        </div>
    </div>

</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped></style>