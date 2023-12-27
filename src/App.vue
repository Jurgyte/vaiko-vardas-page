<!-- font-family: Avenir,Helvetica,Arial,sans-serif; -->
<template>
  <div id="childnameselector" class="ax-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">

    <div class="max-w-3xl mx-auto">
      <Tabs :page="page" :setPage="setPage"></Tabs>
      <h4 v-show="page !== 2" class="flex items-center mt-6">
        Filtrai
        <FilterIcon class="flex-shrink-0 ml-1 h-4 w-4" aria-hidden="true" />
      </h4>
      <div v-show="page == 0">
        <NameList ref="firstForm" />
      </div>
      <div v-show="page == 1">
        <NameList ref="secondForm" />
      </div>
      <div v-show="page == 2">
        <Results :matching-names="matchingNames" :first-form-unmatched="firstFormUnmatched"
          :second-form-unmatched="secondFormUnmatched" />
      </div>
      <div class="flex justify-between mb-2">
        <button
          class="inline-flex h-10 items-center mt-4 px-8 py-2 border border-[#F4B926] rounded-sm text-sm font-medium bg-white border-[#F4B926] text-[#F4B926] hover:border-2 ml-[1px] hover:ml-[0px] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-400"
          :class="[page == 0 ? 'invisible' : '']" @click="setPage(page - 1)">
          Atgal
        </button>
        <button v-if="page !== 2"
          class="inline-flex h-10 items-center mt-4 px-8 py-2 border-[#F4B926] rounded-sm text-sm font-medium text-white bg-[#F4B926] hover:border-2 focus:outline-none mr-[1px] hover:mr-[0px] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-400"
          @click="setPage(page + 1)">
          Išsirinkau
        </button>
        <button v-if="page === 2" @click="reset"
          class="inline-flex h-10 items-center mt-4 px-8 py-2 border border-[#F4B926] rounded-sm text-sm font-medium text-white bg-[#F4B926] hover:border-2 mr-[1px] hover:mr-[0px] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-400">
          Pradėti iš naujo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NameList from "./components/NameList.vue";
import Results from "./components/Results.vue";
import Tabs from "./components/Tabs.vue";
import { FilterIcon } from "@heroicons/vue/outline";
import { ref, computed } from "vue";

const page = ref(0);
const firstForm = ref<InstanceType<typeof NameList> | null>(null);
const secondForm = ref<InstanceType<typeof NameList> | null>(null);

const matchingNames = computed(() => {
  return firstForm?.value?.selectedNames.filter((name: string) =>
    secondForm?.value?.selectedNames.includes(name)
  );
});

const firstFormUnmatched = computed(() => {
  return firstForm?.value?.selectedNames.filter(
    (name: string) => !secondForm?.value?.selectedNames.includes(name)
  );
});

const secondFormUnmatched = computed(() => {
  return secondForm?.value?.selectedNames.filter(
    (name: string) => !firstForm?.value?.selectedNames.includes(name)
  );
});

const reset = () => {
  if (firstForm && firstForm.value) firstForm.value.selectedNames = [];
  if (secondForm && secondForm.value) secondForm.value.selectedNames = [];
  page.value = 0;
};

const setPage = (newPage: number) => {
  page.value = newPage;

  if (window?.parent) {
    window.parent.postMessage(document?.getElementById('childnameselector')?.getBoundingClientRect().top, "https://bitsandkids.com/pages/vaiko-vardo-pasirinkimas");
  }
  else
    document?.getElementById('childnameselector')?.scrollIntoView();
};
</script>
