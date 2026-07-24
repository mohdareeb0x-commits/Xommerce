import { Ionicons } from "@expo/vector-icons";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: keyof typeof Ionicons.glyphMap;
  order: number;
  isActive: boolean;
  createdAt: string;
};
