import { calculateStats } from "../services/trustStatsService";
import {
  Author,
  AuthorHandle,
  Post,
  UserPostTrustClassification,
  TrustLevel,
  TrustSubcategory,
} from "../../src/types/trustTypes";

describe("calculateStats", () => {
  it("calculates trusted percentages correctly", () => {
    const authors: Author[] = [{ id: 1, name: "John Doe" }];
    const handles: AuthorHandle[] = [
      { authorId: 1, handle: "johndoe", platform: "twitter" },
    ];
    const posts: Post[] = [
      { id: 101, authorId: 1, platform: "twitter", url: "http://post1" },
      { id: 102, authorId: 1, platform: "twitter", url: "http://post2" },
    ];
    const trustLevels: TrustLevel[] = [{ id: 1, severity: 1 }];
    const subcategories: TrustSubcategory[] = [{ id: 5, label: "Health" }];
    const userClassifications: UserPostTrustClassification[] = [
      { postId: 101, trustLevelId: 1, trustSubcategoryId: 5, userId: 123 },
      { postId: 102, trustLevelId: 1, trustSubcategoryId: 5, userId: 123 },
    ];

    const result = calculateStats(
      {
        authors,
        handles,
        posts,
        userClassifications,
        trustLevels,
        subcategories,
      },
      "twitter",
      5
    );

    expect(result).toHaveLength(1);
    expect(result[0].overallTrustedPercentage).toBe(100);
    expect(result[0].trustedPostUrl).toBe("http://post1");
  });
});
