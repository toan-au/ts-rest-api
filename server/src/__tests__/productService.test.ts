import mongoose from "mongoose";
import {
  createProduct,
  findProduct,
  findAndUpdateProduct,
  deleteProduct,
} from "../services/product.service";
import ProductModel from "../models/product.model";
import config from "config";

describe("Product Service", () => {
  beforeAll(async () => {
    await mongoose.connect(config.get<string>("dbUri"));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await ProductModel.deleteMany({});
  });

  it("should create a new product", async () => {
    const product = {
      user: new mongoose.Types.ObjectId(),
      productId: "ckb-001",
      title: "Custom Keyboard - Cherry MX Brown",
      description:
        "A fully customizable keyboard with Cherry MX Brown switches, aluminum case, and programmable keys.",
      price: 249.99,
      image: "ckb-001.jpg",
    };

    const createdProduct = await createProduct(product);

    expect(createdProduct).toHaveProperty(
      "title",
      "Custom Keyboard - Cherry MX Brown"
    );
    expect(createdProduct).toHaveProperty(
      "description",
      "A fully customizable keyboard with Cherry MX Brown switches, aluminum case, and programmable keys."
    );
    expect(createdProduct).toHaveProperty("price", 249.99);
  });

  it("should find a product by query", async () => {
    const product = {
      user: new mongoose.Types.ObjectId(),
      productId: "ckb-002",
      title: "Custom Keyboard - Cherry MX Blue",
      description:
        "A fully customizable keyboard with Cherry MX Blue switches, aluminum case, and programmable keys.",
      price: 299.99,
      image: "ckb-002.jpg",
    };

    await createProduct(product);

    const foundProduct = await findProduct({ productId: "ckb-002" });

    expect(foundProduct).toHaveProperty(
      "title",
      "Custom Keyboard - Cherry MX Blue"
    );
    expect(foundProduct).toHaveProperty(
      "description",
      "A fully customizable keyboard with Cherry MX Blue switches, aluminum case, and programmable keys."
    );
    expect(foundProduct).toHaveProperty("price", 299.99);
  });

  it("should update a product", async () => {
    const product = {
      user: new mongoose.Types.ObjectId(),
      productId: "ckb-003",
      title: "Custom Keyboard - Cherry MX Red",
      description:
        "A fully customizable keyboard with Cherry MX Red switches, aluminum case, and programmable keys.",
      price: 279.99,
      image: "ckb-003.jpg",
    };

    await createProduct(product);

    const updatedProduct = await findAndUpdateProduct(
      { productId: "ckb-003" },
      { title: "Custom Keyboard - Cherry MX Red (Updated)" }
    );

    expect(updatedProduct).toHaveProperty(
      "title",
      "Custom Keyboard - Cherry MX Red (Updated)"
    );
  });

  it("should delete a product", async () => {
    const product = {
      user: new mongoose.Types.ObjectId(),
      productId: "ckb-004",
      title: "Custom Keyboard - Cherry MX Black",
      description:
        "A fully customizable keyboard with Cherry MX Black switches, aluminum case, and programmable keys.",
      price: 329.99,
      image: "ckb-004.jpg",
    };

    await createProduct(product);

    await deleteProduct({ productId: "ckb-004" });

    const deletedProduct = await findProduct({ productId: "ckb-004" });

    expect(deletedProduct).toBeNull();
  });
});
