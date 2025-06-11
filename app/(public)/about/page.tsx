import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const base = await parent;
  return {
    title: 'About',
    // @ts-expect-error This is to hack some nextjs jank!
    openGraph: {
      ...base.openGraph,
      title: 'About'
    }
  };
}

export default function About() {
  return (
    <>
      <h1>About Us</h1>

      <p>We are a small team running this server. :3</p>

      <h2>Our Team</h2>
    </>
  );
}
