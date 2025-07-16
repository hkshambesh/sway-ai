import {
  Author,
  AuthorHandle,
  Post,
  TrustStatsResult,
  TrustSubcategory,
  UserPostTrustClassification,
  TrustLevel,
} from "../types/trustTypes";

interface RawData {
  authors: Author[];
  handles: AuthorHandle[];
  posts: Post[];
  userClassifications: UserPostTrustClassification[];
  trustLevels: TrustLevel[];
  subcategories: TrustSubcategory[];
}

export function calculateStats(
  data: RawData,
  platformFilter: string,
  subcategoryFilterId: number
): TrustStatsResult[] {
  const trustedLevelIds = data.trustLevels
    .filter((t) => t.severity <= 2)
    .map((t) => t.id);

  const results: TrustStatsResult[] = [];

  data.authors.forEach((author) => {
    const handles = data.handles.filter(
      (h) =>
        h.authorId === author.id &&
        (platformFilter === "sway" || h.platform === platformFilter)
    );
    handles.forEach((handle) => {
      const authorPosts = data.posts.filter(
        (p) => p.authorId === author.id && p.platform === handle.platform
      );
      if (authorPosts.length === 0) return;

      const classifications = data.userClassifications.filter(
        (c) =>
          authorPosts.some((p) => p.id === c.postId) &&
          c.trustSubcategoryId === subcategoryFilterId
      );

      const totalPosts = new Set(classifications.map((c) => c.postId)).size;
      const trustedPosts = new Set(
        classifications
          .filter((c) => trustedLevelIds.includes(c.trustLevelId))
          .map((c) => c.postId)
      ).size;

      if (trustedPosts === 0) return;

      // least probable trusted post URL 
      const trustedPostUrl =
        authorPosts.find((p) =>
          classifications.some(
            (c) => c.postId === p.id && trustedLevelIds.includes(c.trustLevelId)
          )
        )?.url || null;

      const overallTrustedPercentage =
        trustedPosts > 0 && totalPosts > 0
          ? Number(((trustedPosts / totalPosts) * 100).toFixed(2))
          : 0;

      const subcategoryTrustedPercentage = overallTrustedPercentage;

      results.push({
        id: author.id,
        handle: handle.handle,
        name: author.name,
        platform: handle.platform,
        overallTrustedPercentage,
        subcategoryTrustedPercentage,
        subcategoryLabel:
          data.subcategories.find((s) => s.id === subcategoryFilterId)?.label ||
          "",
        trustedPostUrl,
      });
    });
  });

  return results.sort((a, b) => {
    if (b.overallTrustedPercentage === a.overallTrustedPercentage) {
      return b.subcategoryTrustedPercentage - a.subcategoryTrustedPercentage;
    }
    return b.overallTrustedPercentage - a.overallTrustedPercentage;
  });
}
