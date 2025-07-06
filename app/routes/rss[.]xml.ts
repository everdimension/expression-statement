import { Feed } from "feed";
import { getAllPosts } from "./_posts/shared/getAllPosts";
import { subtitle } from "./_index";

const SITE_URL = "https://expressionstatement.com";
const SITE_TITLE = "Expression Statement";
const SITE_DESCRIPTION = subtitle;

export async function loader() {
  const posts = getAllPosts();
  const publishedPosts = posts.filter((post) => !post.frontmatter.draft);

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    updated: new Date(),
    feedLinks: {
      rss: `${SITE_URL}/rss.xml`,
    },
    author: {
      name: "everdimension",
      email: "everdimension@gmail.com",
      link: "https://twitter.com/everdimension",
    },
    copyright: "2025 everdimension@gmail.com",
  });

  publishedPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/${post.slug}`,
      link: `${SITE_URL}/${post.slug}`,
      description: post.excerpt || post.description || "",
      date: post.date ? new Date(post.date) : new Date(),
      author: [
        {
          email: "everdimension@gmail.com",
          name: "everdimension",
        },
      ],
    });
  });

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}
