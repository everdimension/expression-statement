import s from "./styles.module.css";

export function PieSpinner(props: React.HTMLProps<HTMLDivElement>) {
  return <div className={s.pieSpinner} {...props} />;
}
