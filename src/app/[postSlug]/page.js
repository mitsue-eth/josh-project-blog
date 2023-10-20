import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

import BlogHero from "@/components/BlogHero";
import { MDXRemote } from "next-mdx-remote/rsc";

import styles from "./postSlug.module.css";

async function loadBlogPost(slug) {
  const rawContent = await fs.readFile(`/content/${slug}.mdx`);
  const { data: frontMatter, content } = rawContent;

  return { frontMatter, content };
}

async function BlogPost({ params }) {
  const { postSlug } = params;

  const { frontMatter, content } = loadBlogPost(params.postSlug);
  console.log({ frontMatter });

  return (
    <article className={styles.wrapper}>
      <BlogHero title="Example post!" publishedOn={new Date()} />
      <div className={styles.page}>
        <p>This is where the blog post will go!</p>
        <p>
          You will need to use <em>MDX</em> to render all of the elements
          created from the blog post in this spot.
        </p>
      </div>
    </article>
  );
}

export default BlogPost;
