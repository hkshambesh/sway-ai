import {
  fetchAuthors,
  fetchAuthorHandles,
  fetchPosts,
  fetchUserPostTrustClassifications,
  fetchTrustLevels,
  fetchTrustSubcategories,
} from "./src/db/queries";
import { calculateStats } from "./src/services/trustStatsService";

async function main() {
  const platform = "sway";
  const userId = 123;
  const subcategoryId = 5;

  const authors = await fetchAuthors();
  const handles = await fetchAuthorHandles();
  const posts = await fetchPosts();
  const classifications = await fetchUserPostTrustClassifications(userId);
  const trustLevels = await fetchTrustLevels();
  const subcategories = await fetchTrustSubcategories();

  const stats = calculateStats(
    {
      authors,
      handles,
      posts,
      userClassifications: classifications,
      trustLevels,
      subcategories,
    },
    platform,
    subcategoryId
  );

  console.log(stats);
}

main().catch(console.error);
