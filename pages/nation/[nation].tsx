import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import PageContent from '@/components/PageContent';
import Database from '@/lib/Database';

export default function Nation({ nation, companies }: { nation: any, companies: any[] }) {
  return (
    <>
      <Meta page={{ title: nation.name }} />
      <NavBar currentPage={nation.code} />

      <PageContent>
        <div className="container">
          <h1>{nation.name}</h1>

          <p>{nation.description}</p>

          <h2>Companies</h2>

          {companies.length > 0 ? (
            <ul>
              {companies.map((company) => {
                return (
                  <li key={company.id}>
                    {company.name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>This nation has no companies.</p>
          )}
        </div>
      </PageContent>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const db = new Database();

  const nation = await db.getNationCode(context.query.nation as string);

  if (!nation) {
    return {
      notFound: true
    };
  }

  const companies = await db.getCompaies(nation.id);

  return {
    props: {
      nation,
      companies
    }
  };
}