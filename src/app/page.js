import fs from "fs";
import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";

async function Home() {
  const blogPosts = await getBlogPostList();

  // console.log('Blogposts: ', blogPosts);

  // const filesArray = fs.readdir('content', (err, files) => {
  //   if (err) throw err;
  //   console.log(files);
  // });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPosts.map((post, id) => {
        const { slug, title, abstract, publishedOn } = post;
        return (
          <BlogSummaryCard
            key={id}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
