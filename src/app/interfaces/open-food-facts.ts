type Nutriments = {
  energy_kcal: number;
  fat: number;
  saturated_fat: number;
  carbohydrates: number;
  sugars: number;
  fiber: number;
  proteins: number;
  salt: number;
  sodium: number;
};

type Product = {
  product_name: string;
  image_url: string;
  categories: string;
  brands: string;
  code: string;
  nutriments: Nutriments;
  serving_size?: string;
  nutrition_score_grade?: string;
  nova_group?: number;
  additives_tags?: string[];
};

type OpenFoodFactsResponse = {
  status: number;
  code: string;
  product: Product;
};
