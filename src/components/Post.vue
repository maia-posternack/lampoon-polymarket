<template>
    <div class="create-market-container">
      <h2 class="title">Create a Market</h2>
      
      <form @submit.prevent="submitMarket" class="market-form">
        <!-- Market Question Input -->
        <div class="form-group">
          <label for="market-question">What market would you like to bet on?</label>
          <input type="text" id="market-question" v-model="marketQuestion" placeholder="Enter your market question" required />
        </div>
  
        <!-- Image Upload (Optional) -->
        <div class="form-group file-upload">
          <label for="market-image" class="custom-file-upload">Upload an Image (Optional)</label>
          <input type="file" id="market-image" @change="handleImageUpload" accept="image/*" class="hidden-input" />
        </div>
  
        <!-- Category Selection -->
        <div class="form-group">
          <label for="category">Select a Tag</label>
          <select id="category" v-model="selectedTag" required>
            <option disabled value="">Choose a category</option>
            <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
         <!-- Anonymity Toggle -->
         <div class="form-group checkbox">
          <input type="checkbox" id="anonymous" v-model="isAnonymous" />
          <label for="anonymous">Post Anonymously</label>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="submit-button">Create Market</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const marketQuestion = ref("");
      const marketImage = ref(null);
      const isAnonymous = ref(false);
      const selectedTag = ref("");
      const tags = ["Lampoon", "Crimson", "Final Clubs", "Sports", "Admin", "Other"];
  
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          marketImage.value = URL.createObjectURL(file);
        }
      };
  
      const submitMarket = () => {
        const newMarket = {
          question: marketQuestion.value,
          image: marketImage.value,
          anonymous: isAnonymous.value,
          tag: selectedTag.value,
        };
        
        console.log("Market Submitted:", newMarket);
        // Add API call or Vuex store update here
      };
  
      return {
        marketQuestion,
        marketImage,
        isAnonymous,
        selectedTag,
        tags,
        handleImageUpload,
        submitMarket,
      };
    },
  };
  </script>
  
  <style scoped>
  .create-market-container {
    background-color: rgb(44, 63, 79);
    padding: 30px;
    border-radius: 8px;
    max-width: 450px;
    margin: 20px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .title {
    font-size: 22px;
    color: white;
    font-family: OpenSauceSans-Bold;
    margin-bottom: 20px;
  }
  
  .market-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  
  label {
    font-size: 14px;
    color: white;
    margin-bottom: 5px;
  }
  
  input, select {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: rgb(52, 68, 82);
    color: white;
    font-size: 14px;
    outline: none;
  }
  
  input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  .checkbox {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .checkbox label {
  margin-top: 5px; /* Adjust value as needed */
}

  
  .submit-button {
    background-color: rgb(39, 174, 96);
    color: white;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .submit-button:hover {
    background-color: rgb(33, 148, 82);
  }
  
  /* Custom File Upload Button */
  .file-upload {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .custom-file-upload {
    background-color: rgb(52, 68, 82);
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s ease-in-out;
  }
  
  .custom-file-upload:hover {
    background-color: rgb(60, 80, 100);
  }
  
  .hidden-input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .checkbox {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between checkbox and label */
  cursor: pointer;
}

.checkbox input[type="checkbox"] {
  appearance: none; /* Remove default checkbox */
  width: 18px;
  height: 18px;
  background-color: rgb(52, 68, 82); /* Matches your UI */
  border: 2px solid rgb(100, 120, 140); /* Subtle border */
  border-radius: 4px; /* Slightly rounded edges */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
}

.checkbox input[type="checkbox"]:checked {
  background-color: rgb(39, 174, 96); /* Green when checked */
  border-color: rgb(39, 174, 96);
}

.checkbox input[type="checkbox"]::after {
  content: "✓"; /* Checkmark */
  font-size: 14px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.checkbox input[type="checkbox"]:checked::after {
  opacity: 1; /* Show checkmark */
}

.checkbox label {
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.checkbox input[type="checkbox"]:hover {
  border-color: rgb(150, 170, 190); /* Lighten border on hover */
}

.checkbox input[type="checkbox"]:checked:hover {
  background-color: rgb(33, 148, 82); /* Slightly darker green on hover */
}

  </style>