interface image {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export type Product = {
  id: string;
  sku?: string;
  tag?: string;
  name: string;
  images: image[];
  rating: number;
  category: string;
  description?: string;
  is_favourite: boolean;
  price: number;
  discountedPrice: number;
  discount: number;
};
