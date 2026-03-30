import { HStack, Spacer } from "structure-kit";
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
            border: "2px solid var(--border)",
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
        <div style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
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
      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 40,
          }}
        >
          <img
            src={profilePic}
            alt=""
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "3px solid var(--border)",
              flexShrink: 0,
            }}
          />
          <h1 style={{ fontSize: "2.5rem", lineHeight: 1.1 }}>About</h1>
        </div>

        <p style={{ fontSize: "1.25rem", lineHeight: 1.7, marginTop: 0 }}>
          I'm Yaroslav. I've been building for the web for over 12 years.
          Excited about obscure browser APIs.
        </p>

        <p style={{ lineHeight: 1.7 }}>
          For the past 6 years I've been a software engineer at{" "}
          <a
            href="https://zerion.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zerion
          </a>
          , where I created a crypto{" "}
          <a
            href="https://github.com/zeriontech/zerion-wallet-extension"
            target="_blank"
            rel="noopener noreferrer"
          >
            wallet browser extension
          </a>{" "}
          — one of the best UIs among crypto wallets. Learned a ton about
          extension architecture and browser security, and co-authored{" "}
          <a
            href="https://eips.ethereum.org/EIPS/eip-6963"
            target="_blank"
            rel="noopener noreferrer"
          >
            a web standard
          </a>{" "}
          along the way.
        </p>

        <p style={{ lineHeight: 1.7 }}>
          I study interaction design. Accessibility, keyboard navigation,
          semantics, building for both casual and power users. I think a lot
          about the right architecture for complex interfaces and making the web
          feel like an app.
        </p>

        <Spacer height={40} />

        <hr
          style={{
            border: "none",
            borderTop: "0.5px solid var(--border)",
          }}
        />

        <Spacer height={40} />

        <section>
          <h2
            style={{
              fontSize: "0.75rem",
              fontFamily: "Inter",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--muted-foreground)",
              fontWeight: 600,
            }}
          >
            Links
          </h2>
          <Spacer height={16} />
          <div style={{ display: "grid", gap: 12, lineHeight: 1.7 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "7em 1fr",
                gap: 8,
              }}
            >
              <span style={{ color: "var(--muted-foreground)" }}>X</span>
              <a
                href="https://twitter.com/everdimension"
                target="_blank"
                rel="noopener noreferrer"
              >
                @everdimension
              </a>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "7em 1fr",
                gap: 8,
              }}
            >
              <span style={{ color: "var(--muted-foreground)" }}>GitHub</span>
              <a
                href="https://github.com/everdimension"
                target="_blank"
                rel="noopener noreferrer"
              >
                everdimension
              </a>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "7em 1fr",
                gap: 8,
              }}
            >
              <span style={{ color: "var(--muted-foreground)" }}>Talks</span>
              <div style={{ display: "flex", gap: 16 }}>
                <a
                  href="https://youtu.be/9S8OeCkcUSM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MoscowJS 2018
                </a>
                <a
                  href="https://youtu.be/omeYq2BGYTU"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MoscowJS 2020
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
