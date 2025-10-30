// src/app/tests/product.api.test.ts
import { POST } from "@/app/api/private/admin/products/route";
import { prisma } from "@/app/lib/prisma";
import {
  uploadMainProductImage,
  uploadColorProductImage,
} from "@/utlis/uploadProductImgonCloudinary";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";

// Mock all external dependencies
jest.mock("@/app/lib/prisma", () => ({
  prisma: {
    category: { findUnique: jest.fn() },
    product: {
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
    productSize: { createMany: jest.fn() },
    productFeature: { createMany: jest.fn() },
    productColor: { create: jest.fn() },
    productImage: { create: jest.fn() },
    tag: { create: jest.fn() },
    $transaction: jest.fn(async (actions: any[]) => Promise.all(actions)),
  },
}));

jest.mock("@/utlis/uploadProductImgonCloudinary");
jest.mock("@/utlis/ApiResponders/ApiError");
jest.mock("@/utlis/ApiResponders/ApiResponds");

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
  NextRequest: class {},
}));

describe("Product API", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset all mocks to default implementations
    (ApiError as jest.Mock).mockImplementation(
      (status, message) =>
        new Response(JSON.stringify({ success: false, message }), { status })
    );

    (ApiResponds as jest.Mock).mockImplementation(
      (status, message, data) =>
        new Response(JSON.stringify({ success: true, message, data }), {
          status,
        })
    );

    (uploadMainProductImage as jest.Mock).mockResolvedValue("main-image-url");
    (uploadColorProductImage as jest.Mock).mockResolvedValue("color-image-url");
  });

  describe("POST /api/product", () => {
    const mockProductData = {
      product: {
        name: "Test Product",
        description: "Test Description",
        sellingPrice: 99.99,
        costPrice: 49.99,
        categoryId: "valid-category-id",
      },
      sizes: [
        { size: "M", stockQty: 10 },
        { size: "L", stockQty: 15 },
      ],
      colors: [
        { color: "Red", hexCode: "#FF0000" },
        { color: "Blue", hexCode: "#0000FF" },
      ],
      features: [
        { key: "Material", value: "Cotton" },
        { key: "Wash", value: "Machine Wash" },
      ],
      imagesMeta: [
        { color: "Red", alt: "Red product" },
        { color: "Blue", alt: "Blue product" },
      ],
      tags: [{ name: "New" }, { name: "Summer" }],
    };

    const createMockFormData = () => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(mockProductData));

      // Create mock files
      const mainFile = new File([""], "main.jpg", { type: "image/jpeg" });
      const colorFile1 = new File([""], "red.jpg", { type: "image/jpeg" });
      const colorFile2 = new File([""], "blue.jpg", { type: "image/jpeg" });

      formData.append("mainImage", mainFile);
      formData.append("images", colorFile1);
      formData.append("images", colorFile2);

      return formData;
    };

    it("should create product successfully with all data", async () => {
      // Mock Prisma methods

      (prisma.category.findUnique as jest.Mock).mockResolvedValue({
        id: "valid-category-id",
      });
      (prisma.product.create as jest.Mock).mockResolvedValue({
        id: "product-123",
        ...mockProductData.product,
        mainImgUrl: "main-image-url",
        stockQty: 25, // 10 + 15 from sizes
      });
      (prisma.productSize.createMany as jest.Mock).mockResolvedValue({
        count: 2,
      });
      (prisma.product.update as jest.Mock).mockResolvedValue({});
      (prisma.productFeature.createMany as jest.Mock).mockResolvedValue({
        count: 2,
      });

      (prisma.$transaction as jest.Mock)
        .mockResolvedValueOnce([
          { id: "color-1", color: "Red" },
          { id: "color-2", color: "Blue" },
        ])
        .mockResolvedValueOnce([
          { id: "tag-1", name: "New" },
          { id: "tag-2", name: "Summer" },
        ]);

      (prisma.productImage.create as jest.Mock)
        .mockResolvedValueOnce({ id: "img-1", url: "color-image-url" })
        .mockResolvedValueOnce({ id: "img-2", url: "color-image-url" });

      const formData = createMockFormData();
      const request = { formData: () => Promise.resolve(formData) } as any;

      const response = await POST(request);
      const result = await response.json();

      // Assertions
      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: "valid-category-id" },
      });

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          ...mockProductData.product,
          sellingPrice: expect.any(Object), // Decimal
          costPrice: expect.any(Object), // Decimal
          mainImgUrl: "main-image-url",
          stockQty: 0, // Initial value before sizes calculation
        },
      });

      expect(prisma.productSize.createMany).toHaveBeenCalledWith({
        data: [
          { size: "M", stockQty: 10, productId: "product-123" },
          { size: "L", stockQty: 15, productId: "product-123" },
        ],
      });

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: "product-123" },
        data: { stockQty: 25 },
      });

      expect(ApiResponds).toHaveBeenCalledWith(
        201,
        "Product created successfully",
        expect.objectContaining({
          productId: "product-123",
        })
      );
    });

    it("should return error when categoryId is missing", async () => {
      const invalidData = {
        ...mockProductData,
        product: { ...mockProductData.product, categoryId: null },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(invalidData));
      formData.append("mainImage", new File([""], "test.jpg"));

      const request = { formData: () => Promise.resolve(formData) } as any;

      await POST(request);

      expect(ApiError).toHaveBeenCalledWith(400, "categoryId is required");
    });

    it("should return error when category does not exist", async () => {
      (prisma.category.findUnique as jest.Mock).mockResolvedValue(null);

      const formData = createMockFormData();
      const request = { formData: () => Promise.resolve(formData) } as any;

      await POST(request);

      expect(ApiError).toHaveBeenCalledWith(
        400,
        "Invalid categoryId: valid-category-id"
      );
    });

    it("should return error when main image is missing", async () => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(mockProductData));
      // Intentionally not adding mainImage

      const request = { formData: () => Promise.resolve(formData) } as any;

      // IMPORTANT: make category exist so the test reaches the "no main image" branch
      (prisma.category.findUnique as jest.Mock).mockResolvedValue({
        id: "valid-category-id",
      });

      await POST(request);

      expect(ApiError).toHaveBeenCalledWith(400, "No main image uploaded");
    });

    it("should handle product creation without optional arrays", async () => {
      const minimalData = {
        product: mockProductData.product,
        sizes: [],
        colors: [],
        features: [],
        imagesMeta: [],
        tags: [],
      };

      (prisma.category.findUnique as jest.Mock).mockResolvedValue({
        id: "valid-category-id",
      });
      (prisma.product.create as jest.Mock).mockResolvedValue({
        id: "product-123",
        ...mockProductData.product,
        mainImgUrl: "main-image-url",
        stockQty: 0,
      });

      const formData = new FormData();
      formData.append("data", JSON.stringify(minimalData));
      formData.append("mainImage", new File([""], "main.jpg"));

      const request = { formData: () => Promise.resolve(formData) } as any;

      await POST(request);

      expect(prisma.product.create).toHaveBeenCalled();
      expect(prisma.productSize.createMany).not.toHaveBeenCalled();
      expect(prisma.productFeature.createMany).not.toHaveBeenCalled();
    });

    it("should handle image upload errors", async () => {
      (prisma.category.findUnique as jest.Mock).mockResolvedValue({
        id: "valid-category-id",
      });
      (prisma.product.create as jest.Mock).mockResolvedValue({
        id: "product-123",
        ...mockProductData.product,
      });
      (uploadMainProductImage as jest.Mock).mockRejectedValue(
        new Error("Upload failed")
      );

      const formData = createMockFormData();
      const request = { formData: () => Promise.resolve(formData) } as any;

      const response = await POST(request);
      const result = await response.json();

      expect(result.success).toBe(false);
      // made robust to allow Error object -> string, etc.
      expect(String(result.message)).toContain("Upload failed");
    });
  });
});
