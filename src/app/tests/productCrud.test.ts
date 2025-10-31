// src/app/tests/productCrud.test.ts
import { POST, DELETE } from "@/app/api/private/admin/products/route";
import { prisma } from "@/app/lib/prisma";
import {
  uploadMainProductImage,
  uploadColorProductImage,
} from "@/utlis/uploadProductImgonCloudinary";
import { NextRequest } from "next/server";

// Mock external services
jest.mock("@/utlis/uploadProductImgonCloudinary", () => ({
  uploadMainProductImage: jest.fn(),
  uploadColorProductImage: jest.fn(),
}));

describe("Product API Endpoints", () => {
  let categoryId: number;
  let createdProductId: string;

  beforeAll(async () => {
    console.log("Starting test setup...");

    // Clean up before tests
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    // Create a test category
    const category = await prisma.category.create({
      data: {
        name: "male",
        description: "Men's clothing for testing",
      },
    });
    categoryId = category.id;
    console.log("Created category ID:", categoryId);
  });

  beforeEach(() => {
    // Reset mocks and set up implementations before each test
    jest.clearAllMocks();

    // Setup mock implementations with proper return values
    (uploadMainProductImage as jest.Mock).mockResolvedValue(
      "https://res.cloudinary.com/test/main-image.jpg"
    );
    (uploadColorProductImage as jest.Mock).mockResolvedValue(
      "https://res.cloudinary.com/test/color-image.jpg"
    );
  });

  afterAll(async () => {
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });

  describe("POST /api/private/admin/products", () => {
    it("should create a product with all data successfully", async () => {
      // Arrange
      const productData = {
        product: {
          name: "Complete Test Product",
          description: "A product with all possible data",
          sellingPrice: 99.99,
          costPrice: 45.5,
          categoryId: categoryId,
          brand: "TestBrand",
          material: "Organic Cotton",
          originCountry: "Nepal",
        },
        sizes: [
          { size: "S", stockQty: 5 },
          { size: "M", stockQty: 10 },
          { size: "L", stockQty: 8 },
        ],
        colors: [
          { color: "Blue", hexCode: "#0000FF" },
          { color: "Red", hexCode: "#FF0000" },
        ],
        features: [
          { key: "Material", value: "100% Organic Cotton" },
          { key: "Wash Care", value: "Machine Wash Cold" },
        ],
        imagesMeta: [
          { color: "Blue", alt: "Blue variant view" },
          { color: "Red", alt: "Red variant view" },
          { color: null, alt: "General product view" },
        ],
        tags: [
          { name: "New Arrival" },
          { name: "Eco Friendly" },
          { name: "Limited Edition" },
        ],
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));

      // Create mock files
      const mainImage = new File(["main image content"], "main.jpg", {
        type: "image/jpeg",
      });
      const blueImage = new File(["blue image content"], "blue.jpg", {
        type: "image/jpeg",
      });
      const redImage = new File(["red image content"], "red.jpg", {
        type: "image/jpeg",
      });
      const generalImage = new File(["general image content"], "general.jpg", {
        type: "image/jpeg",
      });

      formData.append("mainImage", mainImage);
      formData.append("images", blueImage);
      formData.append("images", redImage);
      formData.append("images", generalImage);

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "POST",
          body: formData,
        }
      );

      // Debug: Check mock setup
      console.log(
        "Mock setup - uploadMainProductImage:",
        (uploadMainProductImage as jest.Mock).getMockImplementation()
      );
      console.log(
        "Mock setup - uploadColorProductImage:",
        (uploadColorProductImage as jest.Mock).getMockImplementation()
      );

      // Act
      const response = await POST(request);
      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Response result:", result);

      // Debug: Check mock calls
      console.log(
        "uploadMainProductImage calls:",
        (uploadMainProductImage as jest.Mock).mock.calls
      );
      console.log(
        "uploadColorProductImage calls:",
        (uploadColorProductImage as jest.Mock).mock.calls
      );

      // Assert
      expect(response.status).toBe(201);
      expect(result.message).toBe("Product created successfully");
      expect(result.data).toHaveProperty("productId");
      expect(result.data).toHaveProperty("createdProduct");
      expect(result.data).toHaveProperty("uploadedImages");

      // Store for later tests
      createdProductId = result.data.productId;

      // Verify database state
      const dbProduct = await prisma.product.findUnique({
        where: { id: createdProductId },
        include: {
          sizes: true,
          colors: true,
          features: true,
          tags: true,
          images: true,
        },
      });

      expect(dbProduct).toBeTruthy();
      expect(dbProduct?.name).toBe("Complete Test Product");
      expect(dbProduct?.sellingPrice.toString()).toBe("99.99");
      expect(dbProduct?.brand).toBe("TestBrand");
      expect(dbProduct?.stockQty).toBe(23); // 5 + 10 + 8

      // Check relations
      expect(dbProduct?.sizes).toHaveLength(3);
      expect(dbProduct?.colors).toHaveLength(2);
      expect(dbProduct?.features).toHaveLength(2);
      expect(dbProduct?.tags).toHaveLength(3);
      expect(dbProduct?.images).toHaveLength(3);
    });

    it("should create product with minimal required data", async () => {
      // Arrange
      const productData = {
        product: {
          name: "Minimal Product",
          description: "Product with only required fields",
          sellingPrice: 50.0,
          costPrice: 20.0,
          categoryId: categoryId,
          brand: "MinimalBrand",
          material: "Cotton",
          originCountry: "China",
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));

      const mainImage = new File(["main image"], "main.jpg", {
        type: "image/jpeg",
      });
      formData.append("mainImage", mainImage);

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "POST",
          body: formData,
        }
      );

      // Act
      const response = await POST(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(201);
      expect(result.message).toBe("Product created successfully");

      // Verify minimal product was created
      const dbProduct = await prisma.product.findUnique({
        where: { id: result.data.productId },
        include: {
          sizes: true,
          colors: true,
          features: true,
          tags: true,
        },
      });

      expect(dbProduct?.name).toBe("Minimal Product");
      expect(dbProduct?.sizes).toHaveLength(0);
      expect(dbProduct?.colors).toHaveLength(0);
      expect(dbProduct?.stockQty).toBe(0);
    });

    it("should return 400 for missing categoryId", async () => {
      // Arrange
      const productData = {
        product: {
          name: "Invalid Product",
          description: "Product without category",
          sellingPrice: 50.0,
          costPrice: 20.0,
          brand: "TestBrand",
          material: "Cotton",
          originCountry: "China",
          // Missing categoryId
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));

      const mainImage = new File(["main image"], "main.jpg", {
        type: "image/jpeg",
      });
      formData.append("mainImage", mainImage);

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "POST",
          body: formData,
        }
      );

      // Act
      const response = await POST(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result.message).toBe("categoryId is required");
    });

    it("should return 400 for invalid categoryId", async () => {
      // Arrange
      const productData = {
        product: {
          name: "Invalid Category Product",
          description: "Product with invalid category",
          sellingPrice: 50.0,
          costPrice: 20.0,
          categoryId: 99999, // Non-existent category
          brand: "TestBrand",
          material: "Cotton",
          originCountry: "China",
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));

      const mainImage = new File(["main image"], "main.jpg", {
        type: "image/jpeg",
      });
      formData.append("mainImage", mainImage);

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "POST",
          body: formData,
        }
      );

      // Act
      const response = await POST(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result.message).toContain("Invalid categoryId");
    });

    it("should return 400 for missing main image", async () => {
      // Arrange
      const productData = {
        product: {
          name: "No Image Product",
          description: "Product without main image",
          sellingPrice: 50.0,
          costPrice: 20.0,
          categoryId: categoryId,
          brand: "TestBrand",
          material: "Cotton",
          originCountry: "China",
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));
      // No mainImage appended

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "POST",
          body: formData,
        }
      );

      // Act
      const response = await POST(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result.message).toBe("No main image uploaded");
    });
  });

  describe("DELETE /api/private/admin/products", () => {
    let productIds: string[] = [];

    beforeEach(async () => {
      // Create some test products to delete
      const products = await Promise.all([
        prisma.product.create({
          data: {
            name: "Product To Delete 1",
            description: "First product to delete",
            sellingPrice: 30.0,
            costPrice: 15.0,
            categoryId: categoryId,
            brand: "DeleteBrand",
            material: "Cotton",
            originCountry: "USA",
            stockQty: 10,
            mainImgUrl: "delete1.jpg",
          },
        }),
        prisma.product.create({
          data: {
            name: "Product To Delete 2",
            description: "Second product to delete",
            sellingPrice: 40.0,
            costPrice: 20.0,
            categoryId: categoryId,
            brand: "DeleteBrand",
            material: "Polyester",
            originCountry: "China",
            stockQty: 15,
            mainImgUrl: "delete2.jpg",
          },
        }),
      ]);

      productIds = products.map((p) => p.id);
    });

    it("should delete multiple products successfully", async () => {
      // Arrange
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: productIds }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.message).toBe("Products deleted");
      expect(result.deletedIds).toHaveLength(2);
      expect(result.notFoundIds).toHaveLength(0);

      // Verify products are deleted from database
      const remainingProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });
      expect(remainingProducts).toHaveLength(0);
    });

    it("should handle partial deletion when some IDs don't exist", async () => {
      // Arrange
      const nonExistentId = "non-existent-id-123";
      const mixedIds = [...productIds, nonExistentId];

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: mixedIds }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.deletedIds).toHaveLength(2);
      expect(result.notFoundIds).toContain(nonExistentId);
      expect(result.notFoundIds).toHaveLength(1);

      // Verify existing products are deleted
      const remainingProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });
      expect(remainingProducts).toHaveLength(0);
    });

    it("should return 400 for empty IDs array", async () => {
      // Arrange
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: [] }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe("No product IDs provided");
    });

    it("should return 400 for non-array IDs", async () => {
      // Arrange
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: "not-an-array" }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe("No product IDs provided");
    });

    it("should return 404 when no products found for provided IDs", async () => {
      // Arrange
      const nonExistentIds = ["id1", "id2", "id3"];
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/products",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: nonExistentIds }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result.success).toBe(false);
      expect(result.message).toBe("No products found for the provided IDs");
    });
  });
});
