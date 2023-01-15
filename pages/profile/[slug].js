import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import TemplateA from "../../components/Portfolios/TemplateA";

function Portfolio({ template = "TemplateA", user }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#8180fc"
        size="xl"
      />
    );
  }

  switch (template) {
    case "TemplateA":
      return <TemplateA user={user} />;
    default:
      return <h1>Error</h1>;
  }
}

export default Portfolio;

// Generates `/profile/sebastian-lee` and `/profile/sze-kee-tew`
// export async function getStaticPaths() {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/profiles`);
//   const users = await res.json();

//   const paths = users.map((user) => ({ params: { slug: user.slug } }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// `getStaticPaths` requires using `getStaticProps`
export async function getServerSideProps({ params }) {
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/v1/profiles/${params.slug}`
  );
  const user = await response.json();

  // if (!user.slug) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    props: { user },
  };
}
