import { pool } from "./index";
import {
  Author,
  AuthorHandle,
  Post,
  TrustSubcategory,
  UserPostTrustClassification,
  TrustLevel,
} from "../types/trustTypes";

export async function fetchAuthors(): Promise<Author[]> {
  const res = await pool.query("SELECT id, name FROM authors");
  return res.rows;
}

export async function fetchAuthorHandles(): Promise<AuthorHandle[]> {
  const res = await pool.query(
    'SELECT author_id as "authorId", handle, social_platform_id as platform FROM author_handles'
  );
  return res.rows;
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await pool.query(
    'SELECT id, author_id as "authorId", social_platform_id as platform, url FROM posts'
  );
  return res.rows;
}

export async function fetchUserPostTrustClassifications(
  userId: number
): Promise<UserPostTrustClassification[]> {
  const res = await pool.query(
    `
    SELECT post_id as "postId", trust_level_id as "trustLevelId", trust_subcategory_id as "trustSubcategoryId", user_id as "userId"
    FROM user_post_trust_classifications
    WHERE user_id = $1
  `,
    [userId]
  );
  return res.rows;
}

export async function fetchTrustLevels(): Promise<TrustLevel[]> {
  const res = await pool.query("SELECT id, severity FROM trust_levels");
  return res.rows;
}

export async function fetchTrustSubcategories(): Promise<TrustSubcategory[]> {
  const res = await pool.query("SELECT id, label FROM trust_subcategories");
  return res.rows;
}
