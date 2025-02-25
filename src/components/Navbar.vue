<template>
    <nav id="__pm_mobile_top_nav" class="c-fQxlvL">
      <!-- Top Navigation -->
      <div class="c-kSQJAJ">
        <!-- Logo -->
        <a href="/" class="c-fQKxGY">
          <svg class="c-hLuime" width="168" height="38" viewBox="0 0 168 38" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" 
              d="M78.6391 27.3227V9.54077H75.7148V27.3227H78.6391ZM49.9319 21.095V27.3233H46.8903V10.4676H53.455C54.7469 10.4676 55.8645 10.6972 56.8079 11.1564C57.7513 11.6156 58.4697 12.2523 58.9629 13.0666C59.4561 13.8808 59.7027 14.8089 59.7027 15.8508C59.7027 16.939 59.4581 17.8767 58.9688 18.6639C58.4794 19.4511 57.767 20.0531 56.8314 20.4699C55.8958 20.8867 54.7704 21.095 53.455 21.095H49.9319Z"
              fill="black">
            </path>
          </svg>
        </a>
  
        <!-- Auth Buttons -->
        <div class="c-dhzjXW">
          <button class="c-gBrBnR c-gBrBnR-gDWzxt-variant-primary">Log In</button>
          <button class="c-gBrBnR c-gBrBnR-gDWzxt-variant-primary">Sign Up</button>
        </div>
      </div>
  
      <!-- Navigation Links -->
  <div class="c-bkOFjp nav-css">
    <nav aria-label="Main" class="c-eIaOsI">
      <ul class="c-bwDlsh">
        <li class="c-euOKeo">
          <div class="live-container">
            <span class="c-iTkiSG">LIVE</span>
            <div class="live-indicator"></div>
          </div>
        </li>
        <li class="c-hdHRLY"><a href="/markets/all" class="c-kkbLrT c-iekXrk">All</a></li>
        <li class="c-hdHRLY"><a href="/markets?_s=start_date:desc" class="c-kkbLrT c-iekXrk">New</a></li>
        <li class="c-hdHRLY"><a href="/markets/politics" class="c-kkbLrT c-iekXrk">Politics</a></li>
        <li class="c-hdHRLY"><a href="/sports/live" class="c-kkbLrT c-iekXrk">Sports</a></li>
        <li class="c-hdHRLY"><a href="/markets/crypto" class="c-kkbLrT c-iekXrk">Crypto</a></li>
        <li class="c-hdHRLY"><a href="/markets/trump" class="c-kkbLrT c-iekXrk">Trump</a></li>
        <li class="c-hdHRLY"><a href="/dashboards/global-elections" class="c-kkbLrT c-iekXrk">Global Elections</a></li>
        <li class="c-hdHRLY"><a href="/series/elon-tweets" class="c-kkbLrT c-iekXrk">Elon Tweets</a></li>
        <li class="c-hdHRLY"><a href="/mentions" class="c-kkbLrT c-iekXrk">Mentions</a></li>
        <li class="c-hdHRLY"><a href="/markets/creators" class="c-kkbLrT c-iekXrk">Creators</a></li>
        <li class="c-hdHRLY"><a href="/markets/pop-culture" class="c-kkbLrT c-iekXrk">Pop Culture</a></li>
        <li class="c-hdHRLY"><a href="/markets/business" class="c-kkbLrT c-iekXrk">Business</a></li>
      </ul>
    </nav>
  </div>

    </nav>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Dark Mode Toggle (if needed)
  const colorMode = ref("dark");
  
  const toggleDarkMode = () => {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
    document.body.setAttribute("data-color-mode", colorMode.value);
  };
  </script>
  