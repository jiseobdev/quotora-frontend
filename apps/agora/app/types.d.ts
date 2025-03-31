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
  user: User;
  createdAt: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  likeCount: number;
  isLiked: boolean;
  isAnonymous: boolean;
  childAnswers: (Omit<Comment, 'childAnswers'>)[];
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  type: "BIDDER" | "ORDERER";
  companyName: string;
  profileImage: string;
  email: string;
  createdAt: string;
}
