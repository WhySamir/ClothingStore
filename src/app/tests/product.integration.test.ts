// src/app/tests/product.integration.test.ts
import { POST } from "@/app/api/private/admin/products/route";
import { prisma } from "@/app/lib/prisma";
import {
  uploadMainProductImage,
  uploadColorProductImage,
} from "@/utlis/uploadProductImgonCloudinary";

// Only mock external services, NOT Prisma or API response helpers
jest.mock("@/utlis/uploadProductImgonCloudinary");

describe("Product API - Real Database Integration", () => {
  let categoryId: number;

  beforeEach(async () => {
    // await prisma.product.deleteMany();
    // await prisma.category.deleteMany();

    const category = await prisma.category.create({
      data: {
        name: "male",
        description: "Men's clothing for testing",
      },
    });
    categoryId = category.id;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the upload functions to return URLs
    (uploadMainProductImage as jest.Mock).mockResolvedValue(
      "https://res.cloudinary.com/test/main-image.jpg"
    );
    (uploadColorProductImage as jest.Mock).mockResolvedValue(
      "https://res.cloudinary.com/test/color-image.jpg"
    );
  });

  it("should create a real product in Docker test database", async () => {
    const productData = {
      product: {
        name: "Real Test Product - Docker DB",
        description: "This product is actually stored in Docker PostgreSQL",
        sellingPrice: 79.99,
        costPrice: 35.5,
        categoryId: categoryId,
        brand: "TestBrand",
        material: "Cotton",
        originCountry: "Nepal",
      },
      sizes: [
        { size: "S", stockQty: 5 },
        { size: "M", stockQty: 10 },
      ],
      colors: [{ color: "Blue", hexCode: "#0000FF" }],
      features: [{ key: "Material", value: "100% Organic Cotton" }],
      imagesMeta: [{ color: "Blue", alt: "Blue variant" }],
      tags: [{ name: "New Arrival" }],
    };

    // Create FormData with mock files
    const formData = new FormData();
    formData.append("data", JSON.stringify(productData));

    // Create mock image files
    const mainImage = new File(["mock image content"], "main.jpg", {
      type: "image/jpeg",
    });
    const colorImage1 = new File(["mock color image"], "blue.jpg", {
      type: "image/jpeg",
    });

    formData.append("mainImage", mainImage);
    formData.append("images", colorImage1);

    const request = {
      formData: () => Promise.resolve(formData),
    } as any;

    // ACT: Call the actual API endpoint
    const response = await POST(request);

    // DEBUG: Check what's returned
    console.log("Response:", response);
    console.log("Response type:", typeof response);

    // Fix: Handle the case where response might be undefined
    if (!response) {
      throw new Error("POST returned undefined response");
    }

    const result = await response.json();
    console.log("Result:", result);

    // ASSERT: Verify response
    expect(response.status).toBe(201);
    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty("productId");

    const productId = result.data.productId;

    // VERIFY: Check the product actually exists in the database
    const dbProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        sizes: true,
        colors: true,
        features: true,
        tags: true,
      },
    });

    // Assert database state
    expect(dbProduct).toBeTruthy();
    expect(dbProduct?.name).toBe("Real Test Product - Docker DB");
    expect(dbProduct?.categoryId).toBe(categoryId);
    expect(dbProduct?.brand).toBe("TestBrand");

    // Check relations
    expect(dbProduct?.sizes).toHaveLength(2);
    expect(dbProduct?.colors).toHaveLength(1);
    expect(dbProduct?.features).toHaveLength(1);
    expect(dbProduct?.tags).toHaveLength(1);

    console.log(
      `✅ Successfully created product in Docker DB: ${dbProduct?.name}`
    );
    console.log(`📊 Product ID: ${dbProduct?.id}`);
  });

  it("should verify data persistence by querying multiple products", async () => {
    // First, let's create a simple product directly via Prisma to ensure data goes to Docker DB
    const directProduct = await prisma.product.create({
      data: {
        name: "Direct Prisma Product",
        description: "Created directly via Prisma",
        sellingPrice: 59.99,
        costPrice: 25.0,
        categoryId: categoryId,
        brand: "DirectBrand",
        material: "Polyester",
        originCountry: "USA",
        stockQty: 15,
        mainImgUrl: "direct-image.jpg",
      },
    });

    console.log(`📝 Created direct product: ${directProduct.name}`);

    // Query all products
    const allProducts = await prisma.product.findMany({
      include: {
        category: true,
        _count: {
          select: {
            sizes: true,
            colors: true,
            features: true,
            tags: true,
          },
        },
      },
    });

    console.log(
      `📊 Total products in Docker test database: ${allProducts.length}`
    );

    allProducts.forEach((product) => {
      console.log(`- ${product.name} (ID: ${product.id})`);
    });

    // We should have at least the direct product we just created
    expect(allProducts.length).toBeGreaterThan(0);

    const foundProduct = allProducts.find(
      (p) => p.name === "Direct Prisma Product"
    );
    expect(foundProduct).toBeTruthy();
    expect(foundProduct?.categoryId).toBe(categoryId);
  });
});
