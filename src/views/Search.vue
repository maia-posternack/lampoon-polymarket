<template data-color-mode="dark">
  <Navbar />
  <div class="content">
    <SearchBar />
    <Footer />

  </div>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>
