import { Spacer, VStack } from "structure-kit";

const colors = Array.from({ length: 13 }).map((_, index) => {
  const value = `color-mix(in srgb, CanvasText ${Math.round(
    (100 * index) / 12
  )}%, Canvas ${Math.round(100 - (100 * index) / 12)}%)`;
  return { name: `--canvas-text-${index}`, value };
});

export default function Palette() {
  return (
    <div className="column">
      <Spacer height={40} />
      <h1>Palette</h1>
      <Spacer height={40} />
      <VStack gap={40}>
        <h2>Static Colors</h2>
        <div>
          <h3>
            Original palette <code>{"--gray-{0-12}"}</code>
          </h3>
          <Spacer height={20} />
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: 13 }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: 80,
                  aspectRatio: 1,
                  borderRadius: 8,
                  backgroundColor: `var(--gray-${index})`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div>
          <h3>
            CanvasText palette <code>{"--text-{0-12}"}</code> (generated)
          </h3>
          <Spacer height={20} />
          <div style={{ display: "flex", gap: 8 }}>
            {colors.map((color) => {
              return (
                <div
                  key={color.name}
                  style={{
                    width: 80,
                    aspectRatio: 1,
                    borderRadius: 8,
                    backgroundColor: color.value,
                  }}
                ></div>
              );
            })}
          </div>
          <Spacer height={12} />
          <details>
            <summary>Generated Palette for --text</summary>
            <pre>
              {colors
                .map((color) => `${color.name}: ${color.value};`)
                .join("\n")}
            </pre>
          </details>
        </div>
        <div>
          <h3>
            CanvasText palette <code>{"--text-{0-9}"}</code> (adjusted manually)
          </h3>
          <Spacer height={20} />
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: 80,
                  aspectRatio: 1,
                  borderRadius: 8,
                  backgroundColor: `var(--system-text-${index})`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <h2>Semantic Colors</h2>
        <div>
          <h3>
            Neutral palette <code>{"--neutral-{0-9}"}</code>
          </h3>
          <Spacer height={20} />
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: 80,
                  aspectRatio: 1,
                  borderRadius: 8,
                  backgroundColor: `var(--neutral-${index})`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </VStack>
    </div>
  );
}
