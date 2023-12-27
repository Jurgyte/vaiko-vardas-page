<template>
  <div class="text-center mt-8">
    <div class="bg-white p-2 mb-4 bg-repeat bg-[url('./assets/clouds.svg')] stroke-red-100">
      <h3 class="font-medium flex justify-center">
        <EmojiHappyIcon class="text-[#F4B926] mr-2 h-6" />
        Sutampantys vardai
      </h3>
      <div class="border-2 border-[#F4B926] my-4 p-8 grid justify-items-center">
        <div class="flex" v-if="matchingNames?.length === 0">
          <EmojiSadIcon class="inline-flex items-center mr-2 h-8 opacity-20" />
          <span class="inline-flex items-center "> Nėra</span>
        </div>
        <div v-else v-for="(name, nameIdx) in matchingNames" class="border-b border-gray-200 w-full py-2"
          :class="[nameIdx + 1 === matchingNames.length ? 'border-b-0' : '']">
          {{ name }}
        </div>
      </div>
    </div>
    <div class="bg-white p-2">
      <h3 class="font-medium">Nesutapę vardai</h3>
      <div class="border border-gray-200 my-4 p-8 grid justify-items-center">
        <div class="flex" v-if="firstFormUnmatched?.length === 0 && secondFormUnmatched?.length === 0
          ">
          <EmojiSadIcon class="inline-flex items-center mr-2 h-8 opacity-20" />
          <span class="inline-flex items-center ">Nėra</span>
        </div>
        <div v-else class="grid grid-cols-2 gap-16 mt-2">
          <div class="flex flex-col">
            <div class="flex mb-4">
              <UserIcon class="inline-flex items-center mr-2 h-6 opacity-20" />
              <span class="inline-flex items-center ">Pirmo vartotojo pasirinkimai:</span>
            </div>
            <div v-for="(name, nameIdx) in firstFormUnmatched" class="border-b border-gray-200 w-full py-2"
              :class="[nameIdx + 1 === firstFormUnmatched.length ? 'border-b-0' : '']">
              {{ name }}
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex mb-4">
              <UsersIcon class="inline-flex items-center mr-2 h-6 opacity-20" />
              <span class="inline-flex items-center ">Antro vartotojo pasirinkimai:</span>
            </div>
            <div v-for="(name, nameIdx) in secondFormUnmatched" class="border-b border-gray-200 w-full py-2"
              :class="[nameIdx + 1 === secondFormUnmatched.length ? 'border-b-0' : '']">
              {{ name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserIcon, UsersIcon, EmojiSadIcon, EmojiHappyIcon } from "@heroicons/vue/outline";
defineProps(["matchingNames", "firstFormUnmatched", "secondFormUnmatched"]);
</script>
