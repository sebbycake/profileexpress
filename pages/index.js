import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import {
  HStack,
  Stack,
  Heading,
  Highlight,
  Text,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>ProfileExpress | Personal Portfolio Generator</title>
        <meta name="description" content="Build a personal portfolio website in minutes. Filling up a form is all you need to do. create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className={`container ${styles.container_landing_page}`}>
          <div className={styles.landing_page_info_container}>
            <Stack spacing={4}>
              <Heading as="h2" size="2xl" lineHeight="tall">
                <Highlight
                  query={["minutes"]}
                  styles={{
                    px: "4",
                    py: "1 ",
                    rounded: "full",
                    bg: "purple.100",
                  }}
                >
                  Build your personal brand in minutes.
                </Highlight>
              </Heading>

              <Text fontSize="md">
                Set up your portfolio that looks and sounds just like
                you, and captures the attention of recruiters. Whether you are a
                software engineer, product manager or UI/UX designer, showcase
                your achievements here. All with zero code.
              </Text>

              <Link className="btn" href="/form">
                Build now
              </Link>
              <Stack direction={["column", "row"]} spacing={4}>
                <HStack spacing={1}>
                  <Icon as={CheckCircleIcon} w={5} h={5} color="teal.400" />
                  <Text>No credit card required</Text>
                </HStack>

                <HStack spacing={1}>
                  <Icon as={CheckCircleIcon} w={5} h={5} color="teal.400" />
                  <Text>One free template</Text>
                </HStack>
              </Stack>
            </Stack>
          </div>

          <div className={styles.landing_page_img_container}>
            <img
              src="/hero-illustration.png"
              alt=""
              className={styles.landing_page_img}
            />
          </div>
        </main>
      </Layout>
    </>
  );
}
