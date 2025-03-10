<template>
  <div class="searchbar">
    <div class="search-icon">
      <svg stroke="white" fill="white" stroke-width="0" viewBox="0 0 25 25" class="search-svg" height="10px"
        width="10px" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    <input id="homepage-search-input" v-model="searchQuery" @keyup.enter="submitSearch" placeholder="Search by market"
      autocomplete="off" class="search-input" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const router = useRouter();

const submitSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?query=${encodeURIComponent(searchQuery.value)}`);
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'OpenSauceSans-Regular';
  src: url('fonts/OpenSauceSans-Regular.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

.searchbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: rgb(29, 43, 57);
  border-radius: 10px;
  border: 1px solid rgb(66, 84, 100);
  box-sizing: border-box;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  padding: 1px;
  width: 100%;
}

.searchbar:hover {
  background-color: rgb(52, 68, 82);
}

.searchbar:focus-within {
  border-color: white;

}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
}

.search-svg {
  width: 20px;
  height: 20px;
}

.search-input {
  flex-grow: 1;
  height: 40px;
  font-family: OpenSauceSans-Regular;
  font-size: 14px;
  color: white;
  background: transparent;
  border: none;
  outline: none;
  padding-left: 10px;
  text-align: left;
}

.search-input::placeholder {
  color: rgb(180, 180, 180);
}
</style>