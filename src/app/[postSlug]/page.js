import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

import BlogHero from "@/components/BlogHero";
import { MDXRemote } from "next-mdx-remote/rsc";

import styles from "./postSlug.module.css";

async function loadBlogPost(slug) {
  const rawContent = await fs.readFile(
    path.join(process.cwd(), `/content/${slug}.mdx`),
    "utf8"
  );
  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
}

async function BlogPost({ params }) {
  const { postSlug } = params;

  console.log(params);

  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={new Date(frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
