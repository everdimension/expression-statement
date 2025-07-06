import { HStack, Spacer, VStack } from "structure-kit";
import { Layout } from "~/components/Layout";
import { Navbar } from "~/components/Navbar";
import profilePic from "../assets/profile-pic.jpg";
import { useId } from "react";

export function TwitterMedia() {
  const handleLabelId = useId();
  return (
    <HStack gap={12} alignItems="center">
      <a
        href="https://twitter.com/everdimension"
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={handleLabelId}
        style={{ borderRadius: "50%" }}
      >
        <img
          loading="lazy"
          style={{
            display: "block",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid var(--neutral-3)",
          }}
          src={profilePic}
          alt=""
        />
      </a>
      <div style={{ lineHeight: 1.3 }}>
        <a
          id={handleLabelId}
          href="https://twitter.com/everdimension"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:underline"
          style={{ color: "inherit", fontSize: "0.875rem", fontWeight: 500 }}
        >
          @everdimension
        </a>
        <div style={{ color: "var(--neutral-6)", fontSize: "0.8rem" }}>
          Follow me on X
        </div>
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
