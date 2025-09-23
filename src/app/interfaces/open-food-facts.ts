type Nutriments = {
  energy: number;
  fat: number;
  carbohydrates: number;
  proteins: number;
};

type NutriScoreType = {
  grade?: string;
};
type ProductType = {
  product_name: string;
  image_url: string;
  code: string;
  nutriments: Nutriments;
  nutrition_grades: string | null;
  quantity: string | null;
  additives_tags?: string[];
  brands: string;
};

type OpenFoodFactsResponse = {
  status: number;
  code: string;
  product: ProductType;
};

type PantryProductType = {
  id: string;
  inserted_at: string;
  product_id: string;
  quantity: number;
  user_id: string;
  product_name: string;
  image_url: string;
  isLoading?: boolean;
};
