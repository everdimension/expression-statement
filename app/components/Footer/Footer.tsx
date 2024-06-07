import { useEffect, useRef, useState } from "react";
import s from "./footer.module.css";
import { Link } from "@remix-run/react";

function useNow(enabled: boolean) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!enabled) {
      return;
    }
    let id = 0;
    function update() {
      setNow(new Date());
      id = requestAnimationFrame(update);
    }
    update();
    return () => {
      cancelAnimationFrame(id);
    };
  }, [enabled]);
  return now;
}

function Today() {
  const [show, setShow] = useState(false);
  const now = useNow(show);
  const year = String(now.getFullYear());
  const [displayFullDate, setDisplayFullDate] = useState(false);
  useEffect(() => {
    // Client only to avoid hydration mismatch
    setDisplayFullDate(true);
  }, []);
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (show) {
      ref.current?.classList.add(s.visible);
    } else {
      ref.current?.classList.remove(s.visible);
    }
  }, [show]);
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      ref={ref}
      className={s.hoverParent}
      tabIndex={-1}
      onFocus={() => {
        setShow(true);
        // event.currentTarget.classList.add(s.visible);
      }}
      onMouseDown={() => setShow(true)}
      onBlur={() => {
        setShow(false);
      }}
      onMouseLeave={(event) => {
        if (event.relatedTarget instanceof Node) {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setShow(false);
          }
        } else {
          // setShow(true);
        }
      }}
      onMouseEnter={() => {
        setShow(true);
      }}
    >
      {year}
      {displayFullDate ? (
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {now
            .toISOString()
            .slice(year.length)
            .split("")
            .map((char, i, array) => (
              <span
                key={i}
                className={s.hoverContent}
                style={{
                  color:
                    char === "T" || char === "Z"
                      ? "var(--neutral-5)"
                      : undefined,
                  transitionDelay: `${(show ? i : array.length - i) * 10}ms`,
                }}
              >
                {char}
              </span>
            ))}
        </span>
      ) : null}
    </span>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        paddingBlock: "2rem",
        borderTop: "1px solid var(--neutral-2)",
        fontWeight: 800,
      }}
    >
      <div style={{ float: "right" /* Yea! Challenge: guess why. */ }}>
        <Link to="/about" style={{ color: "var(--link)" }}>
          About
        </Link>
      </div>
      <div>
        Expression Statement, <Today />
      </div>
    </footer>
  );
}
