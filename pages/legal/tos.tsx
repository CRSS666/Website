import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <>
      <Meta page={{ title: 'Terms of Service' }} />
      <NavBar currentPage="terms" />

      <PageContent>
        <h1>Terms of Service</h1>

        <p>
          <strong>Effective Date</strong>: {new Date('2024-08-29T02:00:00.000Z').toLocaleDateString()}
        </p>

        <h2 id="acceptance-of-terms">1. Acceptance of Terms</h2>

        <p>
          By accessing or using Clyde&apos;s Real Survival SMP (&quot;CRSS&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use CRSS.
        </p>

        <h2 id="eligibility">2. Eligibility</h2>

        <p>
          To participate in CRSS, you must have a valid Discord account and be at least 13 years old. By using CRSS, you represent and warrant that you meet these eligibility requirements.
        </p>

        <h2 id="user-conduct">3. User Conduct</h2>

        <p>While using CRSS, you agree to:</p>

        <ul>
          <li>
            <strong>Respect Other Users</strong>: Do not engage in harassment, hate speech, discrimination, or any behavior that harms or threatens other users.
          </li>
          <li>
            <strong>Follow the Rules</strong>: Adhere to all posted rules and guidelines specific to CRSS, including in-game rules and server rules.
          </li>
          <li>
            <strong>No Cheating or Exploiting</strong>: Do not use cheats, hacks, or exploits to gain an unfair advantage in the game.
          </li>
          <li>
            <strong>No Unauthorized Activities</strong>: Do not engage in activities that violate any laws or regulations or that could harm CRSS or its users.
          </li>
        </ul>

        <h2 id="account-responsibility">4. Account Responsibility</h2>

        <p>
          You are responsible for maintaining the confidentiality of your Discord account credentials and for all activities that occur under your account. If you suspect any unauthorized use of your account, you must notify CRSS administrators immediately.
        </p>

        <h2 id="content-and-intellectual-property">5. Content and Intellectual Property</h2>

        <p>
          All content within CRSS, including but not limited to text, graphics, logos, and software, is the property of CRSS or its licensors. You may not use, reproduce, distribute, or create derivative works based on this content without explicit permission.
        </p>

        <h2 id="termination">6. Termination</h2>

        <p>
          CRSS reserves the right to terminate or suspend your access to the server at any time, without notice, for violating these Terms of Service or for any other reason deemed necessary by the administrators.
        </p>

        <h2 id="disclaimers">7. Disclaimers</h2>

        <p>
          CRSS is provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that the server will be available at all times or that it will be free of errors or interruptions.
        </p>

        <h2 id="limitation-of-liability">8. Limitation of Liability</h2>

        <p>
          In no event shall CRSS or its administrators be liable for any direct, indirect, incidental, special, or consequential damages arising from your use or inability to use the server.
        </p>

        <h2 id="changes-to-these-terms">9. Changes to These Terms</h2>

        <p>
          CRSS reserves the right to update or modify these Terms of Service at any time. Any changes will be effective immediately upon posting the revised terms. Your continued use of CRSS after any modifications constitutes your acceptance of the updated terms.
        </p>

        <h2 id="contact-information">10. Contact Information</h2>

        <p>
          If you have any questions or concerns about these Terms of Service, please contact us at:
        </p>

        <p>
          <strong>Email:</strong> <Link href="mailto:admin@theclashfruit.me">admin@theclashfruit.me</Link> <br />
          <strong>Discord Server:</strong> <Link href="https://discord.gg/rGjCKawPkS">https://discord.gg/rGjCKawPkS</Link>
        </p>

        <hr />

        <p>
          By using Clyde&apos;s Real Survival SMP, you acknowledge that you have read, understood, and agree to these Terms of Service.
        </p>
      </PageContent>

      <Footer />
    </>
  );
}