<template>
    <div class="flex w-full mb-14">
        <nav class="flex" aria-label="Breadcrumb">
            <ol role="list" class="flex">
                <li class="flex mr-4">
                    <div class="flex items-center mr-4" v-on:click="setPage(0)">
                        <a href="#" class="pt-4 h-6">
                            <div class="flex items-center items-align-center hover:border-b border-black "
                                :class="[page === 0 ? 'border-b hover:border-b-2' : '']">
                                <UserIconSolid v-if="page === 0" class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                <UserIcon v-else class="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                                <p class="ml-2">Renkasi pirmas
                                </p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="flex mr-4">
                    <div class="flex items-center mr-4" v-on:click="setPage(1)">
                        <a href="#" class="pt-4 h-6">
                            <div class="flex items-center items-align-center hover:border-b border-black "
                                :class="[page === 1 ? 'border-b hover:border-b-2' : '']">
                                <UsersIconSolid v-if="page === 1" class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                <UsersIcon v-else class="flex-shrink-0 h-4 w-4" aria-hidden="true" />
                                <p class="ml-2">
                                    Renkasi antras
                                </p>
                            </div>
                        </a>
                    </div>
                </li>
                <li class="flex mr-4">
                    <div class="flex items-center" v-on:click="setPage(2)">
                        <a href="#" class="h-6 pt-4">
                            <p class="border-black hover:border-b ml-2"
                                :class="[page === 2 ? 'border-b hover:border-b-2' : '']">
                                Rezultatai
                            </p>
                        </a>
                    </div>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { UserIcon, UsersIcon } from "@heroicons/vue/outline";
import {
    UserIcon as UserIconSolid,
    UsersIcon as UsersIconSolid,
} from "@heroicons/vue/solid";
defineProps(["setPage", "page"]);
</script>