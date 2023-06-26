type Status = 'done' | 'pending' | 'created';

export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  image: string;
  image_mobile: string;
  image_large: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  __v: number;
  keyId?: string;
};

export type PostDetails = {
  method: 'POST' | 'GET' | 'PATCH';
  headers: {};
  body?: string;
};

export type Response = {
  ok: boolean;
  json: any;
};

export type Order = {
  _id: string;
  ingredients: Array<string>;
  status: Status;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
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
