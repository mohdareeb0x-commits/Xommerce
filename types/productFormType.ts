type ProductImage = {
  url: string;
  alt: string;
  isPrimary: boolean;
};

type Specification = {
  key: string;
  value: string;
};

export type ProductForm = {
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  discountedPrice: number;
  stock: number;
  seller: string;
  tags: string;
  specifications: Specification[];
  images: ProductImage[];
  isActive: boolean;
};
