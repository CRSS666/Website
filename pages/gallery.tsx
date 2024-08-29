import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';

export default function Gallery() {
  return (
    <>
      <Meta page={{ title: 'Gallery' }} />
      <NavBar currentPage="gallery" />

      <PageContent>
        <div className="container">
          <h1>Gallery</h1>

          <p>
            Under Construction
          </p>
        </div>
      </PageContent>

      <Footer />
    </>
  );
}
