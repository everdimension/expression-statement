import { HStack, Spacer, VStack } from "structure-kit";
import { Layout } from "~/components/Layout";
import { Navbar } from "~/components/Navbar";
import profilePic from "../assets/profile-pic.jpg";

export function TwitterMedia() {
  return (
    <HStack gap={8} alignItems="center">
      <img
        style={{ width: 32, height: 32, borderRadius: "50%" }}
        src={profilePic}
        alt=""
      />
      <div>
        <a
          href="https://twitter.com/everdimension"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontStyle: "italic" }}
        >
          @everdimension
        </a>
      </div>
    </HStack>
  );
}

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

          <Spacer height={40} />
          <h2>Contacts</h2>
          <Spacer height={20} />
          <div style={{ display: "grid", gap: 8 }}>
            <HStack gap={12} alignItems="baseline">
              <div>Twitter:</div>
              <div>
                <a
                  href="https://twitter.com/everdimension"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontStyle: "italic" }}
                >
                  x.com/everdimension
                </a>
              </div>
            </HStack>
            <HStack gap={12} alignItems="baseline">
              <div>Github:</div>
              <div>
                <a
                  href="https://github.com/everdimension"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontStyle: "italic" }}
                >
                  github.com/everdimension
                </a>
              </div>
            </HStack>
          </div>
        </main>
      </VStack>
    </Layout>
  );
}
