import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import dynamic from "next/dynamic";

import BlogHero from "@/components/BlogHero";
import { MDXRemote } from "next-mdx-remote/rsc";

import COMPONENT_MAP from "@/helpers/mdx-components";

import styles from "./postSlug.module.css";

const cachedLoadBlogPost = React.cache(async (slug) => {
  console.log("Cached function is running");
  const rawContent = await fs.readFile(
    path.join(process.cwd(), `/content/${slug}.mdx`),
    "utf8"
  );

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

export async function generateMetadata({ params }) {
  // read route params
  const { frontmatter } = await cachedLoadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = params;

  const { frontmatter, content } = await cachedLoadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={new Date(frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
