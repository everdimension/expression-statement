import { Footer } from "../Footer";

export function Layout({
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className="column"
      style={{
        display: "grid",
        gap: "4rem",
        gridTemplateRows: "1fr auto",
        minHeight: "100%",
      }}
      {...props}
    >
      <div
        // prevent this grid-item from expanding wider that parent grid
        style={{ minWidth: 0 }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
