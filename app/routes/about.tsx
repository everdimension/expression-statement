import { Link } from "@remix-run/react";
import { Layout } from "~/components/Layout";

export default function About() {
  return (
    <Layout>
      <nav>
        <div
          style={{
            paddingBlock: "2rem",
            marginBottom: "4rem",
            display: "grid",
            gap: "1rem",
          }}
        >
          <Link
            to="/"
            className="heading hover:primary"
            style={{ lineHeight: 0.9, color: "var(--link)" }}
          >
            {"<-"} Expression Statement
          </Link>
        </div>
      </nav>
      <h1>About</h1>
    </Layout>
  );
}
