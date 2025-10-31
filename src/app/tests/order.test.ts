// src/app/tests/order.test.ts
import { GET, DELETE } from "@/app/api/private/admin/order/route";
import { prisma } from "@/app/lib/prisma";
import { NextRequest } from "next/server";

describe("Order Admin API Endpoints", () => {
  let customerId: string;
  let orderIds: string[] = [];
  let categoryId: number;
  let productId: string;

  beforeAll(async () => {
    console.log("Starting order API test setup...");

    // Clean up all related data
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.wishlistItem.deleteMany({});
    await prisma.productColor.deleteMany({});
    await prisma.productSize.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.productFeature.deleteMany({});
    await prisma.tag.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.category.deleteMany({});

    // Create test customer
    const customer = await prisma.customer.create({
      data: {
        id: "test-customer-id",
        name: "Test Customer",
        email: "test-customer@example.com",
        userAvatarUrl: "test-avatar.jpg",
      },
    });
    customerId = customer.id;
    console.log("Created customer:", customerId);

    // Create category
    const category = await prisma.category.create({
      data: {
        name: "male",
        description: "Test category for orders",
      },
    });
    categoryId = category.id;
    console.log("Created category:", categoryId);

    // Create product
    const product = await prisma.product.create({
      data: {
        name: "Order Test Product",
        description: "Product for order testing",
        sellingPrice: 49.99,
        costPrice: 25.0,
        categoryId: categoryId,
        brand: "OrderTest",
        material: "Cotton",
        originCountry: "USA",
        stockQty: 50,
        mainImgUrl: "order-test.jpg",
      },
    });
    productId = product.id;
    console.log("Created product:", productId);

    // Create initial test orders
    await setupTestOrders();
  });

  afterAll(async () => {
    // Final cleanup
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.$disconnect();
  });

  describe("GET /api/private/admin/order", () => {
    it("should fetch all orders successfully", async () => {
      // Act
      const response = await GET();
      const result = await response.json();

      console.log("GET Orders Response:", {
        status: response.status,
        message: result.message,
        dataLength: result.data?.length,
      });

      // Assert
      expect(response.status).toBe(200);
      expect(result.message).toBe("order got successfully");
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(3); // We created 3 orders

      // Verify order structure
      const order = result.data[0];
      expect(order).toHaveProperty("id");
      expect(order).toHaveProperty("customerId");
      expect(order).toHaveProperty("totalAmount");
      expect(order).toHaveProperty("status");
      expect(order).toHaveProperty("createdAt");
      expect(order).toHaveProperty("items");
      expect(Array.isArray(order.items)).toBe(true);
    });

    it("should return orders with correct data types", async () => {
      // Act
      const response = await GET();
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);

      // Check each order has correct data types
      result.data.forEach((order: any) => {
        expect(typeof order.id).toBe("string");
        expect(typeof order.customerId).toBe("string");
        expect(typeof order.status).toBe("string");
        expect(order.createdAt).toBeDefined();
        expect(Array.isArray(order.items)).toBe(true);
        expect(typeof order.totalAmount).toBe("string");

        // Parse and verify it's a valid number
        const totalAmount = parseFloat(order.totalAmount);
        expect(totalAmount).toBeGreaterThan(0);
        expect(isNaN(totalAmount)).toBe(false);
      });

      // Verify we have orders with different statuses
      const statuses = result.data.map((order: any) => order.status);
      expect(statuses).toContain("PENDING");
      expect(statuses).toContain("PROCESSING");
      expect(statuses).toContain("SHIPPED");
    });

    it("should return empty array when no orders exist", async () => {
      // Arrange - temporarily delete all orders
      await prisma.orderItem.deleteMany({});
      await prisma.order.deleteMany({});

      // Act
      const response = await GET();
      const result = await response.json();

      console.log("GET Empty Orders Response:", result);

      // Assert
      expect(response.status).toBe(200);
      expect(result.message).toBe("order got successfully");
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(0);

      // Restore orders for other tests
      await setupTestOrders();
    });
  });

  describe("DELETE /api/private/admin/order", () => {
    beforeEach(async () => {
      // Ensure we have test orders before each delete test
      await setupTestOrders();
    });

    it("should delete multiple orders successfully", async () => {
      // Arrange
      const ordersToDelete = orderIds.slice(0, 2); // Delete first 2 orders
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/order",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: ordersToDelete }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      console.log("DELETE Orders Response:", result);

      // Assert
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.message).toBe("orders deleted");
      expect(result.deletedIds).toHaveLength(2);
      expect(result.notFoundIds).toHaveLength(0);

      // Verify orders are actually deleted from database
      const remainingOrders = await prisma.order.findMany({
        where: { id: { in: ordersToDelete } },
      });
      expect(remainingOrders).toHaveLength(0);

      // Verify remaining order still exists
      const remainingOrder = await prisma.order.findUnique({
        where: { id: orderIds[2] },
      });
      expect(remainingOrder).toBeTruthy();
    });

    it("should handle partial deletion when some IDs don't exist", async () => {
      // Arrange
      const nonExistentId = "non-existent-order-id-123";
      const mixedIds = [orderIds[0], nonExistentId];

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/order",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: mixedIds }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      console.log("DELETE Partial Response:", result);

      // Assert
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.deletedIds).toHaveLength(1);
      expect(result.deletedIds).toContain(orderIds[0]);
      expect(result.notFoundIds).toHaveLength(1);
      expect(result.notFoundIds).toContain(nonExistentId);

      // Verify the existing order was deleted
      const deletedOrder = await prisma.order.findUnique({
        where: { id: orderIds[0] },
      });
      expect(deletedOrder).toBeNull();
    });

    it("should return 400 for empty IDs array", async () => {
      // Arrange
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/order",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: [] }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      console.log("DELETE Empty IDs Response:", result);

      // Assert
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe("No order IDs provided");
    });

    it("should return 400 for non-array IDs", async () => {
      // Arrange
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/order",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: "not-an-array" }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      console.log("DELETE Non-array IDs Response:", result);

      // Assert
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe("No order IDs provided");
    });

    it("should return 404 when no orders found for provided IDs", async () => {
      // Arrange
      const nonExistentIds = ["id1", "id2", "id3"];
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/order",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: nonExistentIds }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      console.log("DELETE No Orders Found Response:", result);

      // Assert
      expect(response.status).toBe(404);
      expect(result.success).toBe(false);
      expect(result.message).toBe("No order found for the provided IDs");
    });

    it("should cascade delete order items when order is deleted", async () => {
      // Arrange
      const orderToDelete = orderIds[0];

      // First verify order items exist
      const orderItemsBefore = await prisma.orderItem.findMany({
        where: { orderId: orderToDelete },
      });
      expect(orderItemsBefore.length).toBeGreaterThan(0);

      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/order",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: [orderToDelete] }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);

      // Verify order items are also deleted (cascade)
      const orderItemsAfter = await prisma.orderItem.findMany({
        where: { orderId: orderToDelete },
      });
      expect(orderItemsAfter).toHaveLength(0);
    });

    it("should handle invalid ID values gracefully", async () => {
      // Arrange
      const request = new NextRequest(
        "http://localhost:3000/api/private/admin/order",
        {
          method: "DELETE",
          body: JSON.stringify({ ids: [null, undefined, ""] }),
        }
      );

      // Act
      const response = await DELETE(request);
      const result = await response.json();

      console.log("DELETE Invalid IDs Response:", result);

      // Assert - should return 400 for invalid IDs
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe("No valid order IDs provided");
    });
  });

  // Helper function to set up test orders
  async function setupTestOrders() {
    // Clean existing orders and items
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});

    // Recreate test orders
    const orders = await Promise.all([
      prisma.order.create({
        data: {
          customerId,
          totalAmount: 99.98,
          status: "PENDING",
          items: {
            create: [
              {
                productId,
                quantity: 2,
                price: 49.99,
                shippingCost: 5.99,
                taxes: 2.5,
                couponDiscount: 0,
              },
            ],
          },
        },
      }),
      prisma.order.create({
        data: {
          customerId,
          totalAmount: 149.97,
          status: "PROCESSING",
          items: {
            create: [
              {
                productId,
                quantity: 3,
                price: 49.99,
                shippingCost: 8.99,
                taxes: 3.75,
                couponDiscount: 5.0,
              },
            ],
          },
        },
      }),
      prisma.order.create({
        data: {
          customerId,
          totalAmount: 49.99,
          status: "SHIPPED",
          items: {
            create: [
              {
                productId,
                quantity: 1,
                price: 49.99,
                shippingCost: 4.99,
                taxes: 1.25,
                couponDiscount: 0,
              },
            ],
          },
        },
      }),
    ]);

    orderIds = orders.map((order) => order.id);
    console.log("Reset test orders:", orderIds);
  }
});
