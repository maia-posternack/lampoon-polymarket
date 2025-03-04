<template>
  <div class="card">
    <div class="card-header">
      <div class="image-container">
        <img :src="image" :alt="title" class="card-image" />
      </div>
      <div class="card-content">
        <a :href="link" class="card-title">{{ title }}</a>
        <div class="odds-container">
          <svg class="odds-graphic" width="58" height="29" viewBox="-29 -29 58 29">
            <path d="M -29.001 0 A 29 29 0 1 1 29 0" fill="none" stroke="#858D92" stroke-width="4"></path>
            <path :d="oddsPath" fill="none" 
      :stroke="odds < 50 ? '#E64800' : '#27ae60'"
      stroke-opacity="0.8155" stroke-width="4">
</path>          </svg>
          <div class="odds-text">
            <p>{{ odds }}%</p>
            <p>chance</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
  <div class="buy-button-container">
  <button class="buy-button buy-yes">
    <div class="buy-button-content">
      <span>Buy Yes</span>
      <div class="buy-button-icons">
        <div class="arrow-icon">
          <div class="arrow-icon">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" 
              viewBox="0 0 24 24" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
            <!-- Top Arrow -->
            <path d="M6 12L12 6L18 12L16.5 13.5L12 9L7.5 13.5Z"></path>
            <!-- Bottom Arrow (Moved further down) -->
            <path d="M6 18L12 12L18 18L16.5 19.5L12 15L7.5 19.5Z"></path>
          </svg>
        </div>
      </div>
       </div>
    </div>
  </button>
  
  <button class="buy-button buy-no">
    <div class="buy-button-content">
      <span>Buy No</span>
      <div class="buy-button-icons">
        <span class="arrow-icon">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" 
              viewBox="0 0 24 24" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
            <!-- Top Arrow (Moved further up) -->
            <path d="M6 6L12 12L18 6L16.5 4.5L12 9L7.5 4.5Z"></path>
            <!-- Bottom Arrow -->
            <path d="M6 12L12 18L18 12L16.5 10.5L12 15L7.5 10.5Z"></path>
          </svg>


        </span>
      </div>
    </div>
  </button>
</div>

      <div class="poster-info">
        <img :src="posterImage" :alt="posterName" class="poster-image" />
        <p>{{ posterName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
    link: String,
    odds: Number,
    posterImage: String,
    posterName: String
  },
  computed: {
    oddsPath() {
  const percentage = 1 - this.odds / 100; // Invert the percentage
  const angle = percentage * 180; // Convert to an angle (0 to 180 degrees)
  
  // Calculate correct end coordinates
  const x = 29 * Math.cos((angle * Math.PI) / 180);
  const y = -29 * Math.sin((angle * Math.PI) / 180);
  
  return `M -29 0 A 29 29 0 0 1 ${x} ${y}`;
}


  }
};



</script>

<style scoped>
@font-face {
  font-family: 'OpenSauceSans-Bold';
  src: url('fonts/OpenSauceSans-Bold.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'OpenSauceSans-Medium';
  src: url('fonts/OpenSauceSans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'OpenSauceSans-SemiBold';
  src: url('fonts/OpenSauceSans-SemiBold.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

.card {
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 5px;
  width: 100%;
  background-color: rgb(44, 63, 79);
  border-bottom-color: rgb(52, 68, 82);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgb(52, 68, 82);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: rgb(52, 68, 82);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(52, 68, 82);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 3px 6px 0px, rgba(0, 0, 0, 0.02) 0px 6px 12px 0px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  direction: ltr;
  display: flex;
  flex-direction: column;
  font-family: OpenSauceSans-Bold;
  height: 175px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 12px;
  position: relative;
  text-size-adjust: 100%;
  transition-behavior: normal, normal;
  transition-delay: 0s, 0s;
  transition-duration: 0.1s, 0.1s;
  transition-property: box-shadow, background-color;
  transition-timing-function: ease, ease;
  unicode-bidi: isolate;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.card {
  transition: background-color 0.2s ease-in-out; /* Smooth transition effect */
}

.card:hover {
  background-color: #435463; /* Changes background on hover */
}

.card-header {
  align-items: flex-start;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  column-gap: 8px;
  direction: ltr;
  display: flex;
  font-family: OpenSauceSans-Bold;
  height: 42px;
  max-height: 42px;
  min-height: 42px;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
  row-gap: 8px;
  text-size-adjust: 100%;
  unicode-bidi: isolate;
  width: 100%;
  z-index: 3;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.image-container {
  width: 38px;
  height: 38px;
  border-radius: 4px;
  overflow: hidden;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-content {
  display: flex;
  flex-direction: column; /* Stack elements (title & odds-container) */
  align-items: flex-start;
  justify-content: space-between; /* Ensures space between title & odds-container */
  gap: 8px; /* Keeps spacing consistent */
  width: 100%; /* Ensures it spans full width */
}

.card-title {
  max-width: calc(100% - 80px); /* Prevents it from touching odds-container */
  position: relative;
  text-decoration: none;
  color: white;
  overflow: hidden;
}

.odds-text p {
  margin: 0;
}
.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px; /* Matches card padding */
  width: 100%; /* Ensures full width for the container */
}
.buy-button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.buy-yes {
  background: green;
  color: white;
}
.buy-no {
  background: red;
  color: white;
}
.poster-info {
  display: flex;
  align-items: center;
}
.poster-image {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}
.odds-container {
  transform: translateY(-12px) ; /* Moves it up by 10px */
  position: absolute;
  top: 10px;
  right: 10px;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  cursor: default;
  direction: ltr;
  display: flex;
  height: 68px;
  justify-content: flex-end;
  text-size-adjust: 100%;
  unicode-bidi: isolate;
  width: auto;
  height: auto;
  padding: 5px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  column-gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers items horizontally */
  justify-content: center; /* Centers content within container */
  overflow: visible;


}
.odds-graphic {
  color: rgba(0, 0, 0, 0.8);
  cursor: default;
  overflow: visible;
  position: relative;
  direction: ltr;
  display: flex;
  font-family: __sauce_f5be8f, __sauce_Fallback_f5be8f;
  height: 29px;
  text-size-adjust: 100%;
  unicode-bidi: isolate;
  width: 58px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}


.poster-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
}
.odds-text {
  transform: translateY(-13px); /* Moves it up without affecting layout flow */
  box-sizing: border-box;
  color: rgb(252, 252, 252);
  cursor: default;
  direction: ltr;
  display: block;
  font-family:OpenSauceSans-Medium !important;
  font-size: 14px;
  font-weight: 500;
  height: 17.5px;
  letter-spacing: normal;
  line-height: 17.5px;
  margin-block-end: 0px;
  margin-block-start: 0px;
  margin-bottom: 0px;
  margin-inline-end: 0px;
  margin-inline-start: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  text-align: center;
  text-size-adjust: 100%;
  transition-behavior: normal;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease;
  unicode-bidi: isolate;
  width: 28.8828px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-align: center; /* Centers text horizontally */
  width: 100%; /* Ensures it spans the container */
}
.odds-text p:last-child {
  margin: -2px;
  font-size: 11px;
  opacity: .5;
  color: rgb(252, 252, 252);
}
.card-footer {
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  column-gap: 8px;
  direction: ltr;
  display: flex;
  flex-direction: column;
  height: 124px;
  justify-content: flex-end;
  opacity: 1;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  row-gap: 8px;
  text-size-adjust: 100%;
  transform: matrix(1, 0, 0, 1, 0, 0);
  unicode-bidi: isolate;
  width: 100%;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.buy-button-container {
  display: flex;
  transform: translateY(-35px); /* Moves it up by 10px */
  gap: 8px; /* Keeps a small gap between buttons */
  width: 100%; /* Makes sure it fills the available space */
}

.buy-button {
  width: 100%; /* Allow it to take full container width */
  max-width: calc(100% - 12px); /* Ensure it doesn't exceed available space */
}


.buy-yes {
  background-color: #27ae60;
  color: white;
}

.buy-no {
  background-color: #E64800;
  color: white;
}

.buy-button-content {
  display: flex;
  align-items: center;
  gap: 5px;
}

.buy-button-icons {
  display: flex;
  gap: 4px;
}

.buy-button {
  align-items: center;
  appearance: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-style: none;
  border-left-width: 0px;
  border-right-style: none;
  border-right-width: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top-style: none;
  border-top-width: 0px;
  box-sizing: border-box;
  cursor: pointer;
  direction: ltr;
  display: flex;
  flex-basis: 0%;
  flex-grow: 1;
  flex-shrink: 1;
  font-family:OpenSauceSans-Medium !important ;
  font-feature-settings: normal;
  font-kerning: auto;
  font-optical-sizing: auto;
  font-size: 14px;
  font-size-adjust: none;
  font-stretch: 100%;
  font-weight: 600;
  height: 36px;
  justify-content: center;
  letter-spacing: normal;
  line-height: 20px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-block-end: 0px;
  padding-block-start: 0px;
  padding-inline-end: 16px;
  padding-inline-start: 16px;
  padding-left: 16px;
  padding-right: 16px;
  text-align: start;
  text-indent: 0px;
  text-overflow: ellipsis;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  text-transform: none;
  text-wrap-mode: nowrap;
  transition-behavior: normal, normal;
  transition-delay: 0s, 0s;
  transition-duration: 0.075s, 0.075s;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out, ease-in-out;
  user-select: none;
  white-space-collapse: collapse;
  width: 289px;
  word-spacing: 0px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.buy-yes {
  background-color: rgba(39, 174, 96, 0.2); /* Green with 10% opacity */
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  color: rgb(39, 174, 96); /* Text stays fully visible */
}

.buy-yes:hover {
  background-color: rgb(39, 174, 96); /* Solid green on hover */
  color: rgb(255, 255, 255); /* Text turns white on hover */
}
.buy-no {
  background-color: rgba(230, 72, 0, 0.2); /* Green with 10% opacity */
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  color: rgb(230, 72, 0); /* Text stays fully visible */
}

.buy-no:hover {
  background-color: rgb(230, 72, 0); /* Solid green on hover */
  color: rgb(255, 255, 255); /* Text turns white on hover */
}
.poster-info {
  align-items: center;
  background-color: rgba(45, 156, 219, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0);
  border-bottom-left-radius: 500px;
  border-bottom-right-radius: 500px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgba(0, 0, 0, 0);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: rgba(0, 0, 0, 0);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgba(0, 0, 0, 0);
  border-top-left-radius: 500px;
  border-top-right-radius: 500px;
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: none;
  box-sizing: border-box;
  color: white;
  column-gap: 4px;
  cursor: pointer;
  direction: ltr;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  height: 24px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-left: 2px;
  padding-right: 8px;
  row-gap: 4px;
  text-decoration-color: rgb(47, 128, 237);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-decoration-thickness: auto;
  text-size-adjust: 100%;
  text-wrap-mode: nowrap;
  transition-behavior: normal, normal, normal;
  transition-delay: 0s, 0s, 0s;
  transition-duration: 0.1s, 0.2s, 0.1s;
  transition-property: box-shadow, border-color, transform;
  transition-timing-function: ease, ease, ease-in-out;
  white-space-collapse: collapse;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: OpenSauceSans-SemiBold;
}

.poster-info {
  width: auto; /* Allows the container to expand based on text length */
  min-width: fit-content; /* Ensures it only takes up as much space as needed */
  padding-left: 4px; /* Keeps left padding consistent */
  padding-right: 8px; /* Adds right padding for a balanced look */
}

.poster-info p, 
.poster-info span {
  margin-left: -5px; /* Moves text 5px to the left */
}



</style>

