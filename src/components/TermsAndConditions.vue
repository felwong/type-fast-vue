<template>
  <div class="terms-container">
    <h1>Terms and Conditions</h1>
    <p>Please read these terms and conditions carefully before using Our Service.</p>

    <h2>General Web Game Usage</h2>
    <p>This is a game for children. By playing this game, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you may not play this game.</p>

    <h2>Disclaimer</h2>
    <p>The platform does not guarantee the success delivery of the game to the recipient.</p>

    <h2>User Conduct</h2>
    <p>You agree to not do any of the following:</p>
    <ul>
      <li>Post or transmit any message that is offensive, discriminatory, or otherwise inappropriate.</li>
      <li>Use the game for any commercial purpose.</li>
      <li>Interfere with or disrupt the game or servers or networks connected to the game.</li>
    </ul>

    <h2>Responsibility</h2>
    <p>The sender is responsible for the message they sent. The platform is not responsible for any messages sent by users.</p>

    <button @click="goBack">Go Back</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.terms-container {
  padding: 20px;
  background-color: #1a1a1a;
  color: white;
}
</style>
