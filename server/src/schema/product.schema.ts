import { TypeOf, object, number, string } from "zod";

const productPayload = {
  body: object({
    title: string({ required_error: "Email is required" }).min(
      2,
      "Description should be atleast 2 characters long"
    ),
    description: string({ required_error: "Password is required" }).min(
      3,
      "Description should be atleast 3 characters long"
    ),
    price: number({ required_error: "Price is required" }),
    image: string({ required_error: "Image is required" }),
  }),
};

const params = {
  params: object({
    productId: string({ required_error: "productId is required" }),
  }),
};

export const createProductSchema = object({
  ...productPayload,
});

export const findProductSchema = object({
  ...params,
});

export const updateProductSchema = object({
  ...params,
  ...productPayload,
});

export const deleteProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type FindProductInput = TypeOf<typeof findProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
