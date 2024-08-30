import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';

export default function NotFound() {
  return (
    <>
      <Meta page={{ title: '404' }} />
      <NavBar currentPage="404" />

      <PageContent>
        <div className="container">
          <h1 id="404-not-found">404 Not Found</h1>

          <p>
            We couldn&apos;t find this page :(
          </p>
        </div>
      </PageContent>

      <Footer />
    </>
  );
}
