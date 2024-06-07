export function Article({ children }: React.PropsWithChildren) {
  return <article className="markdown">{children}</article>;
}
