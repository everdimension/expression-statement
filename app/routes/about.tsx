import { HStack, VStack } from "structure-kit";
import { Layout } from "~/components/Layout";
import { Navbar } from "~/components/Navbar";

export default function About() {
  return (
    <Layout>
      <Navbar />
      <VStack gap={20}>
        <h1>About</h1>

        <main>
          <div>
            <strong style={{ fontWeight: "var(--font-weight-body)" }}>
              Expression Statement
            </strong>{" "}
            is about Software, User Experience Design and the Web Platform
          </div>
          <HStack gap={12} alignItems="center">
            <img
              style={{ width: 32, height: 32, borderRadius: "50%" }}
              src="https://pbs.twimg.com/profile_images/826440416371302400/HosO7Uze_400x400.jpg"
              alt=""
            />
            <p>
              <a
                href="https://twitter.com/everdimension"
                style={{ color: "var(--black)", fontStyle: "italic" }}
              >
                @everdimension
              </a>
            </p>
          </HStack>
        </main>
      </VStack>
    </Layout>
  );
}
