const logo = (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 60, height: 60 }}
  >
    <rect width="200" height="200" fill="black" />
    <path
      d="M55.1648 182V100.545H111.96V116.534H74.8523V133.239H109.057V149.267H74.8523V166.011H111.96V182H55.1648ZM163.838 124.966C163.573 122.049 162.393 119.782 160.298 118.165C158.23 116.521 155.274 115.699 151.429 115.699C148.884 115.699 146.762 116.03 145.065 116.693C143.368 117.356 142.096 118.271 141.247 119.438C140.399 120.578 139.961 121.89 139.935 123.375C139.882 124.595 140.12 125.669 140.651 126.597C141.207 127.525 142.003 128.347 143.037 129.062C144.098 129.752 145.37 130.362 146.855 130.892C148.34 131.422 150.011 131.886 151.867 132.284L158.867 133.875C162.897 134.75 166.45 135.917 169.526 137.375C172.628 138.833 175.226 140.57 177.321 142.585C179.442 144.6 181.047 146.92 182.134 149.545C183.221 152.17 183.778 155.114 183.804 158.375C183.778 163.519 182.478 167.934 179.906 171.619C177.334 175.305 173.636 178.129 168.81 180.091C164.011 182.053 158.217 183.034 151.429 183.034C144.615 183.034 138.675 182.013 133.611 179.972C128.547 177.93 124.609 174.828 121.798 170.665C118.988 166.502 117.543 161.239 117.463 154.875H136.315C136.475 157.5 137.177 159.688 138.423 161.438C139.67 163.188 141.38 164.513 143.554 165.415C145.755 166.316 148.3 166.767 151.19 166.767C153.842 166.767 156.096 166.409 157.952 165.693C159.834 164.977 161.279 163.983 162.287 162.71C163.295 161.437 163.812 159.979 163.838 158.335C163.812 156.797 163.334 155.485 162.406 154.398C161.478 153.284 160.047 152.33 158.111 151.534C156.202 150.712 153.762 149.956 150.793 149.267L142.281 147.278C135.228 145.661 129.673 143.049 125.617 139.443C121.56 135.811 119.545 130.905 119.571 124.727C119.545 119.689 120.897 115.275 123.628 111.483C126.359 107.691 130.137 104.735 134.963 102.614C139.789 100.492 145.291 99.4318 151.469 99.4318C157.779 99.4318 163.255 100.506 167.895 102.653C172.562 104.775 176.181 107.758 178.753 111.602C181.325 115.447 182.637 119.902 182.69 124.966H163.838Z"
      fill="white"
    />
  </svg>
);

export function PostSocialPreview({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: number | string | undefined;
}) {
  // const footerType = "watermark" as "default" | "watermark";
  const footerType = "default" as "default" | "watermark";
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        padding: 28,
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          borderRadius: 12,
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 44,
          backgroundColor: "#f1f3f5",
          color: "black",
          fontFamily: "Inter",
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              // paddingRight: 90,
              lineHeight: 1,
            }}
          >
            {title}
          </div>

          <div style={{ display: "none", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: 500 }}>{description}</span>
            </div>
          </div>
          {date ? (
            <span
              style={{
                display: "none",
                fontWeight: 500,
                color: "#868e96",
                fontSize: 18,
              }}
            >
              {new Intl.DateTimeFormat("en", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date(date))}
            </span>
          ) : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {logo}
          {footerType === "watermark" ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-end",
                gap: 6,
                alignItems: "baseline",
                fontSize: 32,
                color: "#868e96",
                // fontWeight: 900,
              }}
            >
              Expression Statement
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-end",
                gap: 6,
                alignItems: "baseline",
                fontSize: 28,
              }}
            >
              <div>Read on</div>
              <div style={{ fontWeight: 900, borderBottom: "1px solid black" }}>
                Expression Statement
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MainPageSocialPreview() {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        padding: 28,
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          borderRadius: 12,
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 44,
          backgroundColor: "#f1f3f5",
          color: "black",
          fontFamily: "Inter",
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex" }}>{logo}</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            // paddingRight: 90,
            lineHeight: 1,
            textAlign: "center",
            justifyContent: "center",
            marginTop: -8,
          }}
        >
          Expression Statement
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 28,
            color: "#868e96",
          }}
        >
          Software, UX Design and the Web
        </div>
      </div>
    </div>
  );
}
