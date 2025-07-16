export interface Author {
  id: number;
  name: string;
}

export interface AuthorHandle {
  authorId: number;
  handle: string;
  platform: string;
}

export interface TrustSubcategory {
  id: number;
  label: string;
}

export interface Post {
  id: number;
  authorId: number;
  platform: string;
  url: string;
}

export interface UserPostTrustClassification {
  postId: number;
  trustLevelId: number;
  trustSubcategoryId: number;
  userId: number;
}

export interface TrustLevel {
  id: number;
  severity: number;
}

export interface TrustStatsResult {
  id: number;
  handle: string;
  name: string;
  platform: string;
  overallTrustedPercentage: number;
  subcategoryTrustedPercentage: number;
  subcategoryLabel: string;
  trustedPostUrl: string | null;
}
