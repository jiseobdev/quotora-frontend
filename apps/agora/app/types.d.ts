interface Discussion {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  uploadImageUrls: object[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isAnonymous: boolean;
  user: object;
  createdAt: string;
}
