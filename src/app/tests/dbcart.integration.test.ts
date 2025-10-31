// src/app/tests/cart.database.test.ts
import { prisma } from "@/app/lib/prisma";

describe("Cart Database Operations - Direct Testing", () => {
  let productId: string;
  let colorId: string;
  let sizeId: string;
  let customerId: string;

  beforeAll(async () => {
    // Clean up any existing test data
    await prisma.cart.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.customer.deleteMany({});

    // Create a test customer
    const customer = await prisma.customer.upsert({
      where: { id: "test-customer-id" },
      update: {},
      create: {
        id: "test-customer-id",
        name: "Test Customer",
        email: "test@example.com",
        userAvatarUrl: "test-avatar.jpg",
      },
    });

    customerId = customer.id;

    // Create a category
    const category = await prisma.category.create({
      data: {
        name: "male",
        description: "Test category for cart",
      },
    });

    // Create a product
    const product = await prisma.product.create({
      data: {
        name: "Cart Test Product",
        description: "Product for cart testing",
        sellingPrice: 49.99,
        costPrice: 25.0,
        categoryId: category.id,
        brand: "CartTest",
        material: "Cotton",
        originCountry: "USA",
        stockQty: 50,
        mainImgUrl: "cart-test.jpg",
      },
    });
    productId = product.id;

    // Create product sizes
    await prisma.productSize.createMany({
      data: [
        { productId, size: "S", stockQty: 10 },
        { productId, size: "M", stockQty: 15 },
      ],
    });

    // Create product colors
    await prisma.productColor.createMany({
      data: [
        { productId, color: "Red", hexCode: "#FF0000" },
        { productId, color: "Blue", hexCode: "#0000FF" },
      ],
    });

    // Get the created IDs
    const createdSizes = await prisma.productSize.findMany({
      where: { productId },
    });
    const createdColors = await prisma.productColor.findMany({
      where: { productId },
    });

    sizeId = createdSizes[0].id;
    colorId = createdColors[0].id;

    console.log(`🛒 Test setup complete`);
  });

  // Clean up cart after each test
  afterEach(async () => {
    await prisma.cart.deleteMany({});
  });

  it("should add item to cart directly in database", async () => {
    const cartItem = await prisma.cart.create({
      data: {
        customerId,
        productId,
        colorId,
        sizeId,
        itemQty: 2,
      },
      include: {
        product: true,
        color: true,
        size: true,
        customer: true,
      },
    });

    console.log("🛒 Cart item created:", cartItem.id);

    // Verify the cart item
    expect(cartItem).toBeTruthy();
    expect(cartItem.productId).toBe(productId);
    expect(cartItem.colorId).toBe(colorId);
    expect(cartItem.sizeId).toBe(sizeId);
    expect(cartItem.customerId).toBe(customerId);
    expect(cartItem.itemQty).toBe(2);
    expect(cartItem.product.name).toBe("Cart Test Product");
    expect(cartItem.color.color).toBe("Red");
    expect(cartItem.size.size).toBe("S");

    console.log(` Cart item verified in database`);
  });

  it("should update cart item quantity", async () => {
    // First create a cart item
    const cartItem = await prisma.cart.create({
      data: {
        customerId,
        productId,
        colorId,
        sizeId,
        itemQty: 1,
      },
    });

    console.log("🛒 Initial cart item created:", cartItem.id);

    // Update quantity
    const updatedCartItem = await prisma.cart.update({
      where: { id: cartItem.id },
      data: { itemQty: 3 },
    });

    expect(updatedCartItem.itemQty).toBe(3);
    console.log(`Cart item quantity updated from 1 to 3`);
  });

  it("should delete cart item from database", async () => {
    // First create a cart item
    const cartItem = await prisma.cart.create({
      data: {
        customerId,
        productId,
        colorId,
        sizeId,
        itemQty: 1,
      },
    });

    console.log("🛒 Cart item created for deletion test:", cartItem.id);

    // Verify it exists
    const existingItem = await prisma.cart.findUnique({
      where: { id: cartItem.id },
    });
    expect(existingItem).toBeTruthy();

    // Delete the item
    await prisma.cart.delete({
      where: { id: cartItem.id },
    });

    // Verify it's gone
    const deletedItem = await prisma.cart.findUnique({
      where: { id: cartItem.id },
    });
    expect(deletedItem).toBeNull();

    console.log(` Cart item successfully deleted from database`);
  });

  it("should prevent duplicate cart items", async () => {
    // Create first cart item
    const cartItem1 = await prisma.cart.create({
      data: {
        customerId,
        productId,
        colorId,
        sizeId,
        itemQty: 1,
      },
    });

    console.log("🛒 First cart item created:", cartItem1.id);

    // Try to create duplicate (same customer, product, color, size)
    try {
      await prisma.cart.create({
        data: {
          customerId,
          productId,
          colorId,
          sizeId, // Same combination
          itemQty: 2,
        },
      });
      // If we reach here, the test should fail because duplicate was allowed
      expect(true).toBe(false); // Force test failure
    } catch (error: any) {
      expect(error.code).toBe("P2002");
      console.log(
        ` Duplicate cart items correctly prevented with error: ${error.code}`
      );
    }
  });

  afterAll(async () => {
    // Final cleanup
    await prisma.cart.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.customer.deleteMany({});
  });
});
