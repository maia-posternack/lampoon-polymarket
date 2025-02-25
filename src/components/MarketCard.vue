<template>
    <div class="c-dhzjXW c-dhzjXW-idNOCmT-css" @click="goToMarket">
      <div class="c-dhzjXW c-dhzjXW-ilnIma-css">
        <div class="c-PJLV c-PJLV-icPidla-css">
          <div class="c-PJLV c-PJLV-igTCeuK-css" style="width: 38px; min-width: 38px; height: 38px; border-radius: 4px;">
            <img :alt="market.question" :src="market.image" class="c-PJLV c-PJLV-ihgxTkZ-css" />
          </div>
        </div>
        <div class="c-dhzjXW c-dhzjXW-ijblzia-css">
          <a :href="`/event/${market.id}`" class="c-fQKxGY c-fQKxGY-ikpfMtn-css">
            <p class="c-dqzIym c-dqzIym-fxyRaa-color-normal">{{ market.question }}</p>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  import { useRouter } from "vue-router";
  
  const props = defineProps(["market"]);
  const router = useRouter();
  
  const goToMarket = () => {
    router.push(`/market/${props.market.id}`);
  };
  </script>
  