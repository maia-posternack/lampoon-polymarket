<!-- src/components/PasswordPrompt.vue -->
<template>
  <div class="password-prompt">
    <h2>Enter Password</h2>
    <div class="input-container">
      <input v-model="password" type="password" placeholder="Password" @keyup.enter="submitPassword"
        class="password-input" />
    </div>
    <button @click="submitPassword" class="submit-button">Submit</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      error: '',
    };
  },
  methods: {
    submitPassword() {
      if (this.password === 'letmein') {
        this.$emit('authenticated', true);
      } else {
        this.error = 'Incorrect password. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
/* Centering the password prompt container */
.password-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1d2b39;
  /* Background color similar to .searchbar */
  margin-top: 100px;
}

/* Styling the input container to mimic .searchbar */
.input-container {
  display: flex;
  align-items: center;
  background: rgb(29, 43, 57);
  border-radius: 10px;
  border: 1px solid rgb(66, 84, 100);
  padding: 1px;
  width: 300px;
  /* Set a fixed width for consistency */
  margin-bottom: 20px;
}

/* Styling the password input field */
.password-input {
  flex-grow: 1;
  height: 40px;
  font-family: 'OpenSauceSans-Regular', sans-serif;
  font-size: 14px;
  color: white;
  background: transparent;
  border: none;
  outline: none;
  padding-left: 10px;
}

.password-input::placeholder {
  color: rgb(180, 180, 180);
}

/* Styling the submit button */
.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(45, 156, 219);
  border: none;
  border-radius: 7px;
  color: white;
  font-family: 'OpenSauceSans-Medium', sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 36px;
  padding: 9.6px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: rgb(38, 133, 187);
  /* Slightly darker shade on hover */
}

/* Styling the error message */
.error {
  color: red;
  margin-top: 10px;
  font-family: 'OpenSauceSans-Regular', sans-serif;
}
</style>