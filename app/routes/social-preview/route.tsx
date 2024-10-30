import { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPostBySlug } from "../_posts/shared/getPostBySlug";
import { getGoogleFonts, jsxToPng } from "./jsxToPng";
import { PostSocialPreview } from "./PostSocialPreview";
// import { MainPageSocialPreview } from "./PostSocialPreview/PostSocialPreview";
import img1 from "./pre-built/you-are-not-using-form-validation-enough.png";

const images = new Map(
  Object.entries({
    "you-are-not-using-form-validation-enough": img1,
  })
);

function truncateWords(text: string, limit: number) {
  let string = "";
  let prevPendingWhiteSpace = "";
  let pendingWhiteSpace = "";
  let pendingSymbols = "";
  for (const symbol of text.split("")) {
    if (
      string.length + pendingWhiteSpace.length + pendingSymbols.length >
      limit
    ) {
      break;
    }
    if (/\s/.test(symbol)) {
      string += prevPendingWhiteSpace;
      string += pendingSymbols;
      prevPendingWhiteSpace = "";
      pendingSymbols = "";
      pendingWhiteSpace += symbol;
    } else {
      if (pendingWhiteSpace) {
        prevPendingWhiteSpace = pendingWhiteSpace;
        pendingWhiteSpace = "";
      }
      pendingSymbols += symbol;
    }
  }
  const result = string.replace(/(,|\s-|\.)$/, "");
  return result.endsWith(".") ? result : `${result}...`;
}

// const GENERATE_ENABLED = process.env.NODE_ENV === "development";
const GENERATE_ENABLED = true;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("post");
  invariant(slug, "post param is required");
  const imagePath = images.get(slug);
  if (imagePath) {
    const imageUrl = new URL(imagePath, url.origin);
    const imageBuffer = await fetch(imageUrl).then((res) => res.body);
    return new Response(imageBuffer, {
      headers: { "Content-Type": "image/png" },
    });
  } else if (GENERATE_ENABLED) {
    const post = await getPostBySlug(slug, url.origin);

    const png = await jsxToPng({
      fonts: await getGoogleFonts("Inter", [400, 900]),
      jsx: (
        // <MainPageSocialPreview />
        <PostSocialPreview
          title={post.title}
          description={truncateWords(post.description, 180)}
          date={post.date}
        />
      ),
    });
    return new Response(png, { headers: { "Content-Type": "image/png" } });
  } else {
    throw new Error("Forbidden");
  }
}
