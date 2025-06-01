import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About'
};

export default function About() {
  return (
    <>
      <h1>About Us</h1>

      <p>We are a small team running this server. :3</p>

      <h2>Our Team</h2>
    </>
  );
}
