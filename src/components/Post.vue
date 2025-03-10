<template>
  <div class="create-market-container">
    <h2 class="title">Create a Market</h2>

    <form @submit.prevent="submitMarket" class="market-form">
      <!-- Market Question Input -->
      <div class="form-group">
        <label for="market-question"
          >What market would you like to bet on?</label
        >
        <input
          type="text"
          id="market-question"
          v-model="marketQuestion"
          placeholder="Enter your market question"
          required
        />
      </div>

      <!-- Image Upload (Optional) -->
      <div class="form-group file-upload">
        <label for="market-image" class="custom-file-upload">{{
          uploadButtonText
        }}</label>
        <input
          type="file"
          id="market-image"
          @change="handleImageUpload"
          accept="image/*"
          class="hidden-input"
        />
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
  <LoginModal v-if="isModalOpen" @close="isModalOpen = false" />
  <!-- ✅ Debug -->
</template>

<script>
import LoginModal from "@/components/LoginModal.vue"; // ✅ Ensure import
import { ref } from "vue"; // Vue's reactive ref
import { db, storage, collection, addDoc } from "../firebase.js"; // Firebase Firestore & Storage
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // ✅ Rename Firebase ref
import { useRouter } from "vue-router";
import { authStore } from "@/stores/authStore"; // ✅ Import global auth state
import { updateDoc, doc } from "firebase/firestore"; // ✅ Import Firestore update functions

export default {
  setup() {
    const isModalOpen = ref(false); // ✅ Control login modal visibility
    const marketQuestion = ref("");
    const router = useRouter();
    const isAnonymous = ref(false);
    const selectedTag = ref("");
    const tags = [
      "Lampoon",
      "Final Clubs",
      "Professors",
      "Other",
    ];
    const imageUrl = ref(""); // Store the uploaded image URL
    const uploadButtonText = ref("Upload an Image (Optional)");

    const sam_pics = [
      "https://firebasestorage.googleapis.com/v0/b/lampoon-polymarket.firebasestorage.app/o/marketImages%2F1741492327463-IMG_2114.jpg?alt=media&token=079183c7-106a-4ebd-a73c-38ad359bf6b8",
      "https://firebasestorage.googleapis.com/v0/b/lampoon-polymarket.firebasestorage.app/o/marketImages%2F1741492348475-IMG_2116.jpg?alt=media&token=dcf666e7-e4f8-44ac-a95b-b7fdafe79beb",
      "https://firebasestorage.googleapis.com/v0/b/lampoon-polymarket.firebasestorage.app/o/marketImages%2F1741492303184-IMG_2112.jpg?alt=media&token=f127113d-c3f9-45d0-a107-51260cfca9bf",
      "https://firebasestorage.googleapis.com/v0/b/lampoon-polymarket.firebasestorage.app/o/marketImages%2F1741492338426-IMG_2115%202.jpg?alt=media&token=84e0f911-5333-413a-8d48-17b2e6aba2ae",
      "https://firebasestorage.googleapis.com/v0/b/lampoon-polymarket.firebasestorage.app/o/marketImages%2F1741492316121-IMG_2113.jpg?alt=media&token=abe4aa3f-8ed2-436b-b82e-7e15c79b9053",
    ];

    const handleImageUpload = async (event) => {
      console.log("📸 Upload started...");
      const file = event.target.files[0];
      if (!file) return;

      try {
        const fileRef = storageRef(
          storage,
          `marketImages/${Date.now()}-${file.name}`
        ); // ✅ Use storageRef properly
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(
              `Upload Progress: ${
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              }%`
            );
          },
          (error) => {
            console.error("❌ Image Upload Error:", error);
          },
          async () => {
            imageUrl.value = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("✅ Image uploaded successfully:", imageUrl.value);
            uploadButtonText.value = "Image Uploaded"; // Change button text
          }
        );
      } catch (error) {
        console.error("❌ Firebase Storage Error:", error);
      }
    };

    const submitMarket = async () => {
      if (!marketQuestion.value) {
        alert("Please enter a market question.");
        return;
      }

      if (!authStore.currentUser) {
        console.log("not logged in submitting");
        isModalOpen.value = true; // ✅ Show login modal
        console.log(isModalOpen.value);
        return;
      }


      const timestamp = new Date().toISOString(); // ✅ Store as ISO timestamp
      const newMarket = {
        title: marketQuestion.value,
        image:
          imageUrl.value ||
          sam_pics[Math.floor(Math.random() * sam_pics.length)],
        tag: selectedTag.value,
        anonymous: isAnonymous.value,
        posterImage: isAnonymous.value ? "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75": authStore.currentUser.photo,
           // ✅ User's profile photo
        posterName: isAnonymous.value ? "anon" : authStore.currentUser.username, // ✅ User's username
        yesVotes: 50,
        noVotes: 50,
        date_posted: timestamp, // ✅ Date when the market is created
      };

      try {
        const marketRef  = await addDoc(collection(db, "markets"), newMarket);
        console.log("✅ Market Successfully Saved:", newMarket);
        console.log("user",authStore.currentUser)
        console.log("markets", authStore.currentUser.created_markets)


        // ✅ Update Firestore: Add new market ID to user's `created_markets` array
        if (!authStore.currentUser.created_markets) {
          authStore.currentUser.created_markets = []; // ✅ Ensure array exists
        }
        authStore.currentUser.created_markets.push(marketRef.id); // ✅ Add market ID to array

        const userRef = doc(db, "users", authStore.currentUser.uid);
        await updateDoc(userRef, {
          created_markets: authStore.currentUser.created_markets,
        });

        // Reset form
        marketQuestion.value = "";
        imageUrl.value = "";
        selectedTag.value = "";
        isAnonymous.value = false;
        router.push("/");
      } catch (error) {
        console.error("❌ Error saving market:", error);
        alert("Error saving market. Check console.");
      }
    };

    return {
      marketQuestion,
      isAnonymous,
      selectedTag,
      tags,
      handleImageUpload,
      submitMarket,
      uploadButtonText,
      isModalOpen,
    };
  },
  components: {
    LoginModal,
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
  font-family: OpenSauceSans-Bold, sans-serif;
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

input,
select {
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
