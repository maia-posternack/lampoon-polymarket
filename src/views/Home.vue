<template data-color-mode="dark">
  <div class="page-wrapper">

  <Navbar />
  <div class="content">
    <MarketButton />

     <SearchBar />
     <MarketList
    /> 
     <Footer/>
  </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import MarketButton from "../components/MarketButton.vue";
import MarketList from "../components/MarketList.vue";

import Footer from "../components/Footer.vue";
import SearchBar from "../components/SearchBar.vue";

</script>

<style>
/* 🔥 Keep Navbar Fixed and Always on Top */
.sticky {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #333 !important;
  padding: 15px;
  text-align: center;
  z-index: 10000 !important; /* Keep it above all content */
  isolation: isolate;
}

/* 🔥 Make Body Scroll Normally */
body {
  overflow-x: hidden;
  overflow-y: auto; /* Allow scrolling */
  margin: 0;
}

/* 🔥 Allow Content to Scroll But Never Overlap Navbar */
.content {
  position: relative !important;
  z-index: 1 !important;
  padding: 10px !important; 
  padding-top: 110px !important; /* Ensures content starts below navbar */
  padding-bottom: 70px !important; /* Ensures content ends above footer */

}
</style>