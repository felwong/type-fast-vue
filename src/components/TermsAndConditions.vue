<template>
  <div class="terms-container">
    <h1>Terms and Conditions</h1>
    <p>Please read these terms and conditions carefully before using Our Service.</p>

    <h2>General Web Game Usage</h2>
    <p>By playing this game, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you must not play this game.</p>

    <h2>Disclaimer</h2>
    <h3>Service Availability and Delivery</h3>
    Delivery Guarantee Disclaimer. The Platform offers features, such as challenging a friend, which involve the electronic delivery of communications to a third party. The Platform explicitly disclaims any guarantee, warranty, or representation regarding the successful, timely, or intact delivery of any such communication or game challenge to the designated recipient. This lack of guarantee applies to, but is not limited to, delivery failures caused by recipient server issues, network congestion, incorrect recipient information provided by the user, or third-party filtering mechanisms (such as email spam filters).
    <h3>User-Generated and Third-Party Content</h3>
    <ul>
      <li>Content Source and Disclaimer. The Platform allows users to generate and share custom typing challenges, and may also incorporate messages, advertisements, or content provided by third-party sponsors ("Third-Party Content"). While the Platform employs content filtering and sanitization protocols intended to mitigate harmful or offensive material, the Platform is not the creator, author, or publisher of such Third-Party Content.</li>
      <li>Limitation of Liability. You acknowledge and agree that the Platform assumes no legal responsibility or liability for any direct, indirect, incidental, consequential, or exemplary damages, injury, loss, or claim arising from or in connection with your exposure to, reliance on, or use of any Third-Party Content, including, but not limited to, messages that may be offensive, inaccurate, or violate intellectual property rights.</li>
      <li>Waiver and Indemnification. By using the Game and proceeding beyond this notice, you expressly waive and release the Platform, its owners, directors, officers, agents, and employees from any and all claims, demands, damages, and legal proceedings, known or unknown, arising out of or related to your use of Third-Party Content. You agree to use such content strictly at your own risk.</li>    
    </ul>

    <h2>User Conduct</h2>
You understand and agree that your use of the Game and its features (including, but not limited to, creating custom challenges) is subject to the following rules. You agree not to do any of the following:
    <ul>
      <li>Prohibited Content: Post, create, or transmit any message, content, or material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, discriminatory, sexually explicit, invasive of another's privacy, or otherwise objectionable or inappropriate as determined by the Platform.</li>

      <li>Commercial Use: Use the Game, custom challenges, or any content obtained from the Platform for any commercial purpose (including advertising, solicitation, or unauthorized reselling of services) without the express written permission of the Platform.</li>

      <li>Intellectual Property Infringement: Post or transmit any message or content that infringes upon the intellectual property rights, proprietary rights, or rights of publicity or privacy of any third party.</li>

      <li>Technical Interference: Interfere with or disrupt the Game, its servers, or the networks connected to the Game, or disobey any requirements, procedures, policies, or regulations of networks connected to the Game.</li>

      <li>Harmful Software: Introduce any virus, Trojan horse, worm, logic bomb, or other malicious or technologically harmful material into the Platform or the challenges created by other users.</li>

      <li>Harassment/Spam: Use the challenge feature to harass or "spam" recipients, or repeatedly send unwanted challenges to a specific individual or group.</li>

      <li>Misrepresentation: Impersonate any person or entity, including any employee or representative of the Platform, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>

    </ul>

    <h2>Changes to Terms</h2>
    We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. By continuing to access or use Our Service after those revisions become effective, you agree to be bound by the revised terms.
    <div>
    <button @click="goBack">Go Back</button>
    </div>
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
  text-align:left;
}
</style>
