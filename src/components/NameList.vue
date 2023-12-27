<!-- font-family: Avenir,Helvetica,Arial,sans-serif; -->
<template>
  <div class="mb-6 bg-white px-8 pb-8 pt-4 border">

    <RadioGroup v-model="searchOption" class="w-full">
      <div class="grid grid-cols-3">
        <RadioGroupOption as="template" v-for="option in searchOptions" :key="option" :value="option"
          v-slot="{ checked }">
          <div :class="[
            checked
              ? 'bg-[#F4B926] border-transparent text-white hover:bg-[#F4B926]'
              : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
            'cursor-pointer border py-2 px-3 flex items-center justify-center text-sm font-medium sm:flex-1 focus:outline-none first:rounded-l first:-mr-1 last:rounded-r last:-ml-1',
          ]">
            <RadioGroupLabel as="span">
              {{ option }}
            </RadioGroupLabel>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>

    <div class="grid grid-cols-12 gap-6 my-6">
      <div class="col-span-6">
        <label :for="`filter-${id}`" class="block text-sm font-medium">Ieškoti</label>
        <input name="filter" :id="`filter-${id}`" type="email"
          class="shadow-sm focus:ring-[#F4B926] focus:border-[#F4B926] block w-full sm:text-sm border-gray-300"
          v-model="filterText" />
      </div>

      <fieldset class="col-span-6">
        <legend class="block text-sm font-medium">
          Vardo ilgis
        </legend>
        <div class="bg-white ">
          <div class="flex -space-x-px">
            <div class="w-1/2 flex-1 min-w-0">
              <input type="text"
                class="focus:ring-[#F4B926] focus:border-[#F4B926] relative block w-full rounded-none rounded-bl-md rounded-tl-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                placeholder="Nuo" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                v-model="lengthFrom" />
            </div>
            <div class="flex-1 min-w-0">
              <input type="text"
                class="focus:ring-[#F4B926] focus:border-[#F4B926] relative block w-full rounded-none rounded-br-md rounded-tr-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                placeholder="Iki" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                v-model="lengthTo" />
            </div>
          </div>
        </div>
      </fieldset>
    </div>

    <fieldset class="mt-4 md:columns-2 sm:columns-1 space-y-3">
      <!-- <legend class="block text-sm font-medium text-gray-700 mb-1">
              Kiti nustatymai
            </legend> -->
      <div class="relative flex items-start">
        <div class="flex items-center h-5">
          <input :id="`lithuanian-letters-${id}`" name="lithuanian-letters" type="checkbox"
            class="focus:ring-[#F4B926] h-4 w-4 text-[#F4B926] border-gray-300" v-model="noLithuanianLetters" />
        </div>
        <div class="ml-3 text-sm">
          <label :for="`lithuanian-letters-${id}`" class="font-normal">Be lietuviškų raidžių</label>
        </div>
      </div>
      <div class="relative flex items-start">
        <div class="flex items-center h-5">
          <input :id="`top10-${id}`" name="top10" type="checkbox"
            class="focus:ring-[#F4B926] h-4 w-4 text-[#F4B926] border-gray-300" v-model="noTop10" />
        </div>
        <div class="ml-3 text-sm">
          <label :for="`top10-${id}`" class="font-normal">Nepriklauso TOP10</label>
        </div>
      </div>
    </fieldset>

    <div class="mt-6">
      <Disclosure v-slot="{ open }">
        <DisclosureButton class="w-full flex justify-between items-center">
          <span class="text-sm text-black font-medium"> Kilmė </span>
          <ChevronDownIcon
            :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 text-black transform hover:text-gray-500']"
            aria-hidden="true" />
        </DisclosureButton>
        <DisclosurePanel as="dd" class="mt-2 pr-12 border-none">
          <fieldset class="mt-4 md:columns-3 sm:columns-2 xs:columns-2">
            <div class="relative flex items-start" v-for="(origin, originId) in originList" :key="originId">
              <div class="flex items-center h-5">
                <input :id="`origin-${origin.id}-${id}`" :name="`origin-${origin.id}`" :value="origin.name"
                  type="checkbox" class="focus:ring-[#F4B926] h-4 w-4 text-[#F4B926] border-gray-300 rounded"
                  v-model="origin.selected" />
              </div>
              <div class="ml-3 text-sm">
                <label :for="`origin-${origin.id}-${id}`" class="font-normal">{{ origin.name }}
                </label>
              </div>
            </div>
          </fieldset>
          <div class="mt-4 text-center">
            <a @click="selectAllOrigins" class="text-sm cursor-pointer underline text-blue-600 px-2">Pažymėti visas</a>
            <a @click="unselectAllOrigins" class="text-sm cursor-pointer underline text-blue-600 px-2">Atžymėti visas</a>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <div class="mt-6">
      <Disclosure v-slot="{ open }">
        <DisclosureButton class="w-full flex justify-between items-center border-b-gray-400">
          <span class="text-sm font-medium"> Galūnės </span>
          <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform hover:text-gray-500']"
            aria-hidden="true" />
        </DisclosureButton>
        <DisclosurePanel as="dd" class="mt-2 pr-12 border-none">
          <fieldset class="mt-4 md:columns-3 sm:columns-2 xs:columns-2">
            <div v-for="(ending, endingId) in endings" :key="endingId">
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input :id="`ending-${ending.id}-${id}`" :name="`ending-${ending.id}`" :value="ending.name"
                    type="checkbox" class="focus:ring-[#F4B926] h-4 w-4 text-[#F4B926] border-gray-300 rounded"
                    v-model="ending.selected" />
                </div>
                <div class="ml-3 text-sm">
                  <label :for="`ending-${ending.id}-${id}`" class="font-normal">{{ ending.name }}</label>
                </div>
              </div>
            </div>
          </fieldset>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>

  <div id="name-form" class="flex justify-between px-1">
    <div class="relative flex items-start">
      <div class="flex items-center h-5">
        <input :id="`onlyFavs-${id}`" name="onlyFavs" type="checkbox"
          class="focus:ring-[#F4B926] h-4 w-4 text-[#F4B926] border-gray-300" v-model="onlyFavourits" />
      </div>
      <div class="ml-3 text-sm">
        <label :for="`onlyFavs-${id}`" class="font-normal">Rodyti tik pasirinktus</label>
      </div>
    </div>
    <span>Viso: {{ filteredList.length }}</span>
  </div>
  <div class="overflow-hidden select-none">
    <table id="name-table" class="min-w-full divide-y divide-gray-300">
      <tbody class="bg-white">
        <tr v-for="(person, personIdx) in filteredList.slice(
          page * pageSize,
          page * pageSize + pageSize
        )" :key="person.n" class="border-b border-grey-500" :class="[personIdx === 0 ? 'border-t-2' : undefined]"
          v-on:click="handleClick(person.n)">
          <td>
            <StarIcon class="h-5 m-auto" :class="[
              selectedNames.includes(person.n)
                ? 'fill-amber-300'
                : 'fill-neutral-200',
            ]" />
          </td>
          <td class="whitespace-nowrap py-2 pl-3 pr-3 text-sm font-medium sm:pl-6">
            {{ person.n }}
          </td>
          <td class="whitespace-nowrap py-2 pl-3 pr-3 text-sm text-gray-500 sm:pl-6">
            {{ person.o }}
          </td>
          <td class="whitespace-nowrap py-2 pl-3 pr-3 text-sm text-gray-500 sm:pl-6">
            {{ person.a ? "trumpinys" : "" }}
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination">
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700">
          Rodo nuo
          {{ " " }}
          <span class="font-medium">{{ page * pageSize + 1 }}</span>
          {{ " " }}
          iki
          {{ " " }}
          <span class="font-medium">{{ page * pageSize + pageSize }}</span>
          {{ " " }}
          iš
          {{ " " }}
          <span class="font-medium">{{ filteredList.length }}</span>
          {{ " " }}
          vardų
        </p>
      </div>
      <div class="flex-1 flex justify-between sm:justify-end">
        <a class="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-medium hover:text-gray-500 bg-white"
          v-show="hasPreviousPage" @click="goToPrevious">
          <ChevronDownIcon class="rotate-90 h-6 w-6" aria-hidden="true" />
        </a>
        <p class="px-4 py-2 text-sm ml-3">{{ page + 1 }} iš {{ pagesTotal }}</p>
        <a class="cursor-pointer rotate-180 ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium hover:text-gray-500 bg-white"
          v-show="hasNextPage" @click="goToNext">
          <ChevronDownIcon class="rotate-90 h-6 w-6" aria-hidden="true" />
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, computed } from "vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";
import { names } from "../data/Names";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { StarIcon } from "@heroicons/vue/solid";

defineProps(["headline"]);

const id = new Date().getTime();

const searchOptions = ["Visi", "Mergaitės", "Berniukai"];

const lithuanianLetters = /[ąčęėįšųūž]/;
const top10List = [
  "amelija",
  "emilija",
  "liepa",
  "lėja",
  "sofija",
  "gabija",
  "luknė",
  "olivija",
  "kamilė",
  "izabelė",
  "markas",
  "jokūbas",
  "matas",
  "emilis",
  "benas",
  "aronas",
  "nojus",
  "lukas",
  "motiejus",
  "matas",
];

const originList = ref([
  { id: "0", name: "angliškas", selected: true },
  { id: 1, name: "angloamerikietiškas", selected: true },
  { id: 2, name: "anglosaksiškas", selected: true },
  { id: 3, name: "apeliatyvinis", selected: true },
  { id: 4, name: "arabiškas", selected: true },
  { id: 5, name: "aramėjiškas", selected: true },
  { id: 6, name: "baltiškas", selected: true },
  { id: 7, name: "čekiškas", selected: true },
  { id: 8, name: "finikietiškas", selected: true },
  { id: 9, name: "gėliškas", selected: true },
  { id: 10, name: "germaniškas", selected: true },
  { id: 11, name: "graikiškas", selected: true },
  { id: 12, name: "hebrajiškas", selected: true },
  { id: 13, name: "indiškas", selected: true },
  { id: 14, name: "iranietiškas", selected: true },
  { id: 15, name: "ispaniškas", selected: true },
  { id: 16, name: "itališkas", selected: true },
  { id: 17, name: "keltiškas", selected: true },
  { id: 18, name: "lotyniškas", selected: true },
  { id: 19, name: "lyviškas", selected: true },
  { id: 20, name: "prancūziškas", selected: true },
  { id: 21, name: "rusiškas", selected: true },
  { id: 22, name: "skandinaviškas", selected: true },
  { id: 23, name: "škotiškas", selected: true },
  { id: 24, name: "slaviškas", selected: true },
  { id: 25, name: "vengriškas", selected: true },
  { id: 26, name: "vietovardinis", selected: true },
  { id: 27, name: "vokiškas", selected: true },
  { id: 28, name: "kita kilmė", selected: true },
]);

const endings = ref([
  { id: 0, name: "-a", value: "a", selected: true },
  { id: 1, name: "-ė", value: "ė", selected: true },
  { id: 2, name: "-s", value: "s", selected: true },
]);

const filterText = ref("");
const lengthFrom = ref("");
const lengthTo = ref("");
const noLithuanianLetters = ref(false);
const noTop10 = ref(false);
const searchOption = ref(searchOptions[0]);
const onlyFavourits = ref(false);

const page = ref(0);
const pageSize = 50;

const pagesTotal = computed(() => {
  return Math.ceil(filteredList.value.length / pageSize);
});

const hasNextPage = computed(() => {
  return page.value + 1 < pagesTotal.value;
});

const hasPreviousPage = computed(() => {
  return page.value != 0;
});

const goToNext = () => {
  page.value += 1;
  let el = document.getElementById("name-form");

  if (window?.parent)
    window.parent.postMessage(document?.getElementById('name-form')?.getBoundingClientRect().top, "https://bitsandkids.com/pages/vaiko-vardo-pasirinkimas");
  else
    el?.scrollIntoView({ behavior: "smooth" });
};

const goToPrevious = () => {
  page.value -= 1;
  let el = document.getElementById("name-form");
  if (window?.parent)
    window.parent.postMessage(document?.getElementById('name-form')?.getBoundingClientRect().top, "https://bitsandkids.com/pages/vaiko-vardo-pasirinkimas");
  else
    el?.scrollIntoView({ behavior: "smooth" });
};

const filteredList = computed(() => {
  let filter = filterText.value;
  let from = lengthFrom.value;
  let to = lengthTo.value;
  let option = searchOption.value;

  return names.filter((x) => {
    var name = x.n.toLowerCase();

    if (onlyFavourits.value) return selectedNames.value.includes(x.n);

    if (Number(x.p) <= 5) return false;

    if (option === searchOptions[1] && x.g == "m") return false;
    if (option === searchOptions[2] && x.g == "f") return false;
    if (filter.length !== 0 && !name.includes(filter.toLowerCase()))
      return false;
    if (from.length !== 0 && name.length < Number(from)) return false;

    if (to.length !== 0 && name.length > Number(to)) return false;

    if (
      !originList.value.some((origin) => origin.name == x.o && origin.selected)
    )
      return false;

    if (
      !endings.value.some(
        (ending) => ending.value == x.n.slice(-1) && ending.selected
      )
    )
      return false;

    if (noLithuanianLetters.value && lithuanianLetters.test(name)) return false;

    if (noTop10.value && top10List.includes(name)) return false;

    //reset page
    page.value = 0;

    return x;
  });
});

const selectAllOrigins = () => {
  originList.value.map((x) => (x.selected = true));
};

const unselectAllOrigins = () => {
  originList.value.map((x) => (x.selected = false));
};

let selectedNames: Ref<string[]> = ref([]);
const handleClick = (name: string) => {
  let selected = selectedNames.value;
  if (selected.includes(name)) {
    selectedNames.value = selected.filter((n) => n !== name);
  } else selectedNames.value.push(name);
};

defineExpose({
  selectedNames,
});
</script>

<!-- todo: unique IDs-->
