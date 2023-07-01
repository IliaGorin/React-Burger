type Status = 'done' | 'pending' | 'created';

export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  image: string;
  image_mobile: string;
  image_large: string;
  alt: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  __v: number;
  keyId?: string;
  counter?: number;
};

export type PostDetails = {
  method: string;
  headers: {
    'Content-Type': string;
    Authorization?: string | null;
  };
  body?: string;
};

export type Response = {
  ok: boolean;
  json: any;
};

export type OrderType = {
  ingredients: Array<string>;
  _id: string;
  owner: { name: string; email: string; createdAt: string; updatedAt: string };
  status: Status;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export type Ws_Order = {
  id: number;
  order: {
    ingredients?: Array<Ingredient>;
    createdAt: string;
    number: number;
    name: string;
  };
};
