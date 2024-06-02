import s from "./styles.module.css";

export function Article({ children }: React.PropsWithChildren) {
  return <article className={`${s.article} markdown`}>{children}</article>;
}
