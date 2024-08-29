import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <Meta page={{ title: 'Privacy Policy' }} />
      <NavBar currentPage="privacy" />

      <PageContent>
        <h1>Privacy Policy</h1>

        <p>
          <strong>Effective Date</strong>: {new Date('2024-08-29T02:00:00.000Z').toLocaleDateString('en-GB')}
        </p>

        <h2 id="introduction">1. Introduction</h2>

        <p>
          Welcome to Clyde&apos;s Real Survival SMP (&quot;CRSS&quot;). We are
          committed to protecting your privacy and ensuring that your personal
          information is handled in a safe and responsible manner. This Privacy
          Policy outlines the types of information we collect from our users,
          how we use that information, and the measures we take to protect it.
        </p>

        <h2 id="information-we-collect">2. Information We Collect</h2>

        <p>CRSS collects the following personal information from users:</p>

        <ul>
          <li>
            <strong>Discord User IDs</strong>: A unique identifier provided by Discord for each user.
          </li>
          <li>
            <strong>Discord Username</strong>: The username you use on Discord.
          </li>
          <li>
            <strong>Discord Global Display Names</strong>: The display name that is visible to other users on Discord.
          </li>
          <li>
            <strong>Discord Emails</strong>: The email address associated with your Discord account.
          </li>
          <li>
            <strong>User Agents</strong>: Information regarding the device, browser, and operating system you use to access CRSS.
          </li>
        </ul>

        <h2 id="how-we-use-your-information">3. How We Use Your Information</h2>

        <p>The information we collect is used for the following purposes:</p>
        
        <ul>
          <li>
            <strong>Account Management</strong>: To verify your identity and manage your account on CRSS.
          </li>
          <li>
            <strong>Communication</strong>: To send notifications, updates, and other relevant communications related to CRSS.
          </li>
          <li>
            <strong>Security and Moderation</strong>: To ensure the safety and security of our community, including the detection and prevention of fraudulent or unauthorized activities.
          </li>
          <li>
            <strong>Improvement of Services</strong>: To enhance and improve the user experience on CRSS.
          </li>
        </ul>

        <h2 id="sharing-and-disclosure-of-information">4. Sharing and Disclosure of Information</h2>

        <p>CRSS does not sell, trade, or otherwise transfer your personal information to outside parties except under the following circumstances:</p>

        <ul>
          <li>
            <strong>Legal Compliance</strong>: We may disclose your information if required to do so by law or in response to a valid request from a law enforcement authority.
          </li>
          <li>
            <strong>Protection of Rights</strong>: We may share information when we believe it is necessary to protect the rights, property, or safety of CRSS, our users, or others.
          </li>
          <li>
            <strong>Service Providers</strong>: We may engage third-party service providers to perform functions on our behalf, such as server hosting and maintenance. These providers have access to the necessary information only to perform their functions and are obligated to maintain confidentiality.
          </li>
        </ul>

        <h2 id="data-security">5. Data Security</h2>

        <p>We implement reasonable and appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

        <h2 id="data-retention">6. Data Retention</h2>

        <p>We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws. Once your information is no longer needed, we will delete or anonymize it in a secure manner.</p>

        <h2 id="your-rights">7. Your Rights</h2>

        <p>You have the right to:</p>

        <ul>
          <li>
            Access the personal information we hold about you.
          </li>
          <li>
            Request corrections to any inaccuracies in your personal information.
          </li>
          <li>
            Request the deletion of your personal information.
          </li>
          <li>
            Withdraw your consent to the processing of your information.
          </li>
        </ul>

        <p>To exercise these rights, please contact us using the information provided below.</p>

        <h2 id="changes-to-this-privacy-policy">8. Changes to This Privacy Policy</h2>

        <p>CRSS reserves the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the revised policy. We will notify you of any significant changes through the Discord server or by other means. Your continued use of CRSS after any modifications to this Privacy Policy constitutes your acceptance of the updated terms.</p>

        <h2 id="contact-us">9. Contact Us</h2>

        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>

        <p>
          <strong>Email:</strong> <Link href="mailto:admin@theclashfruit.me">admin@theclashfruit.me</Link> <br />
          <strong>Discord Server:</strong> <Link href="https://discord.gg/rGjCKawPkS">https://discord.gg/rGjCKawPkS</Link>
        </p>

        <hr />

        <p>By using Clyde&apos;s Real Survival SMP, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and sharing of your information as described herein.</p>
      </PageContent>

      <Footer />
    </>
  );
}
