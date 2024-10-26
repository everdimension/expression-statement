export async function loader() {
  throw new Error("Demo of a broken route");
}

export default function Component() {
  return <div>will never render</div>;
}
