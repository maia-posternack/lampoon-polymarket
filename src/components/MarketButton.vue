<template>
  <button class="create-market-button" @click="goToCreate">
    <div class="button-content">
      <div class="button-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="white"
          class="plus-svg"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <span class="button-text">Create Market</span>
    </div>
    <div class="extra-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="black"
        class="extra-svg"
      >
        <path
          d="M14.3329 6.29836C14.6119 5.75536 15.3881 5.75536 15.6671 6.29836L17.2658 9.40986C17.3374 9.5492 17.4508 9.66262 17.5901 9.73421L20.7016 11.3329C21.2446 11.6119 21.2446 12.3881 20.7016 12.6671L17.5901 14.2658C17.4508 14.3374 17.3374 14.4508 17.2658 14.5901L15.6671 17.7016C15.3881 18.2446 14.6119 18.2446 14.3329 17.7016L12.7342 14.5901C12.6626 14.4508 12.5492 14.3374 12.4099 14.2658L9.29836 12.6671C8.75536 12.3881 8.75536 11.6119 9.29836 11.3329L12.4099 9.73421C12.5492 9.66262 12.6626 9.5492 12.7342 9.40986L14.3329 6.29836Z"
          fill="black"
        ></path>
        <path
          d="M6.05527 4.86557C6.24126 4.50358 6.75874 4.50358 6.94473 4.86557L7.61455 6.16922C7.66228 6.26211 7.73789 6.33772 7.83078 6.38545L9.13443 7.05527C9.49642 7.24126 9.49642 7.75874 9.13443 7.94473L7.83078 8.61455C7.73789 8.66228 7.66228 8.73789 7.61455 8.83078L6.94473 10.1344C6.75874 10.4964 6.24126 10.4964 6.05527 10.1344L5.38545 8.83078C5.33772 8.73789 5.26211 8.66228 5.16922 8.61455L3.86557 7.94473C3.50358 7.75874 3.50358 7.24126 3.86557 7.05527L5.16922 6.38545C5.26211 6.33772 5.33772 6.26211 5.38545 6.16922L6.05527 4.86557Z"
          fill="black"
        ></path>
        <path
          d="M6.05527 13.8656C6.24126 13.5036 6.75874 13.5036 6.94473 13.8656L7.61455 15.1692C7.66228 15.2621 7.73789 15.3377 7.83078 15.3855L9.13443 16.0553C9.49642 16.2413 9.49642 16.7587 9.13443 16.9447L7.83078 17.6145C7.73789 17.6623 7.66228 17.7379 7.61455 17.8308L6.94473 19.1344C6.75874 19.4964 6.24126 19.4964 6.05527 19.1344L5.38545 17.8308C5.33772 17.7379 5.26211 17.6623 5.16922 17.6145L3.86557 16.9447C3.50358 16.7587 3.50358 16.2413 3.86557 16.0553L5.16922 15.3855C5.26211 15.3377 5.33772 15.2621 5.38545 15.1692L6.05527 13.8656Z"
          fill="black"
        ></path>
      </svg>
    </div>
  </button>
</template>

<script>
export default {
  methods: {
    goToCreate() {
      this.$router.push("/create"); // Navigates to /create
    },
  },
};
</script>

<style scoped>
.create-market-button {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensures even spacing */
  width: 100%;
  height: 36px;
  background-color: rgb(44, 63, 79);
  border: 2px solid transparent;
  border-radius: 8px;
  color: white;
  font-family: OpenSauceSans-Medium !important;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    transform 0.1s ease;
  padding: 8px 12px;
  box-sizing: border-box;
  text-shadow: none;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 10px;
}

.create-market-button:hover {
  background-color: rgb(38, 140, 200);
}

.create-market-button:active {
  background-color: rgb(32, 120, 180);
  transform: scale(0.98);
}

/* Flex container to center icon and text */
.button-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the + icon and text */
  flex-grow: 1; /* Ensures even spacing */
  gap: 8px; /* Space between + icon and text */
}

/* Left icon */
.button-icon {
  display: flex;
  align-items: center;
}

/* Right-side icon */
.extra-icon {
  display: flex;
  align-items: center;
}

/* Ensure both icons are properly sized */
.plus-svg {
  width: 18px;
  height: 18px;
}

.extra-svg {
  width: 24px;
  height: 24px;
}
</style>
