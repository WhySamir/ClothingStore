import { prisma } from "@/app/lib/prisma";
import { POST, GET, PATCH, DELETE } from "@/app/api/cart/route";
import { NextRequest } from "next/server";
import { verifyUser } from "@/utlis/verifyUser";

jest.mock("@/utlis/verifyUser");

describe("Cart API CRUD (App Router)", () => {
  let productId: string;
  let colorId: string;
  let sizeId: string;
  let customerId: string;

  beforeAll(async () => {
    console.log("Starting test setup...");

    // Clean tables in correct order to respect foreign key constraints
    await prisma.cart.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.wishlistItem.deleteMany({});
    await prisma.productColor.deleteMany({});
    await prisma.productSize.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.productFeature.deleteMany({});
    await prisma.tag.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.category.deleteMany({});

    console.log("Cleaned all tables");

    // Create a test customer
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

    // Create a category
    const category = await prisma.category.create({
      data: {
        name: "male",
        description: "Test category",
      },
    });
    console.log("Created category:", category.id);

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
    console.log("Created product:", productId);

    // Create a size and get its ID
    const size = await prisma.productSize.create({
      data: {
        productId,
        size: "M",
        stockQty: 15,
      },
    });
    sizeId = size.id;
    console.log("Created size:", sizeId);

    // Create a color and get its ID
    const color = await prisma.productColor.create({
      data: {
        productId,
        color: "Red",
        hexCode: "#FF0000",
        stockQty: 5,
      },
    });
    colorId = color.id;
    console.log("Created color:", colorId);

    console.log("Test Setup Complete - IDs:", {
      productId,
      colorId,
      sizeId,
      customerId,
    });
  });

  beforeEach(async () => {
    // Clean cart before each test and reset mocks
    await prisma.cart.deleteMany({});
    jest.clearAllMocks();

    // Mock verifyUser to return our test customer
    (verifyUser as jest.Mock).mockResolvedValue({
      id: customerId,
      name: "Test Customer",
      email: "test-customer@example.com",
    });
  });

  afterAll(async () => {
    // Clean up after all tests
    await prisma.cart.deleteMany({});
    await prisma.productColor.deleteMany({});
    await prisma.productSize.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });

  it("successfully adds an item to the cart", async () => {
    console.log("Test 1: Adding item to cart with:", {
      productId,
      colorId,
      sizeId,
      customerId,
    });

    const req = new NextRequest("http://localhost/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        colorId,
        sizeId,
        itemQty: 2,
      }),
    });

    const res = await POST(req);
    console.log("Test 1 - Response status:", res.status);

    expect(res.status).toBe(201);

    const json = await res.json();
    console.log("Test 1 - Full response:", JSON.stringify(json, null, 2));

    expect(json.message).toBe("Cart item added");
    expect(json.data.productId).toBe(productId);
    expect(json.data.colorId).toBe(colorId);
    expect(json.data.sizeId).toBe(sizeId);
    expect(json.data.itemQty).toBe(2);
    expect(json.data.customerId).toBe(customerId);
  });

  it("fetches cart items", async () => {
    console.log("Test 2: Fetching cart items");

    // First add an item to cart
    const postReq = new NextRequest("http://localhost/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        colorId,
        sizeId,
        itemQty: 1,
      }),
    });

    const postRes = await POST(postReq);
    console.log("Test 2 - Add to cart status:", postRes.status);
    expect(postRes.status).toBe(201);

    const postJson = await postRes.json();
    console.log("Test 2 - Add to cart response:", postJson);

    // Then fetch cart items
    const getReq = new NextRequest("http://localhost/api/cart");
    const res = await GET(getReq);
    console.log("Test 2 - Fetch cart status:", res.status);

    expect(res.status).toBe(200);

    const json = await res.json();
    console.log("Test 2 - Fetch cart response:", JSON.stringify(json, null, 2));

    expect(json.message).toBe("Cart fetched successfully");
    expect(json.data.length).toBe(1);
    expect(json.data[0].product.id).toBe(productId);
  });

  it("updates cart item quantity", async () => {
    console.log("Test 3: Updating cart item quantity");

    // First add an item to cart
    const postReq = new NextRequest("http://localhost/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        colorId,
        sizeId,
        itemQty: 1,
      }),
    });

    const postRes = await POST(postReq);
    console.log("Test 3 - Add to cart status:", postRes.status);
    expect(postRes.status).toBe(201);

    const postJson = await postRes.json();
    console.log("Test 3 - Add to cart response:", postJson);

    const cartItemId = postJson.data.id;
    expect(cartItemId).toBeDefined();
    console.log("Test 3 - Cart item ID:", cartItemId);

    // Then update the quantity
    const patchReq = new NextRequest("http://localhost/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartItemId,
        itemQty: 3,
      }),
    });

    const patchRes = await PATCH(patchReq);
    console.log("Test 3 - Update cart status:", patchRes.status);
    expect(patchRes.status).toBe(200);

    const patchJson = await patchRes.json();
    console.log("Test 3 - Update cart response:", patchJson);

    expect(patchJson.message).toBe("Cart item updated");
    expect(patchJson.data.itemQty).toBe(3);
  });

  it("deletes a cart item", async () => {
    console.log("Test 4: Deleting cart item");

    // First add an item to cart
    const postReq = new NextRequest("http://localhost/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        colorId,
        sizeId,
        itemQty: 1,
      }),
    });

    const postRes = await POST(postReq);
    console.log("Test 4 - Add to cart status:", postRes.status);
    expect(postRes.status).toBe(201);

    const postJson = await postRes.json();
    console.log("Test 4 - Add to cart response:", postJson);

    const cartItemId = postJson.data.id;
    expect(cartItemId).toBeDefined();
    console.log("Test 4 - Cart item ID:", cartItemId);

    // Then delete the item
    const deleteReq = new NextRequest("http://localhost/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartItemId,
      }),
    });

    const deleteRes = await DELETE(deleteReq);
    console.log("Test 4 - Delete cart status:", deleteRes.status);
    expect(deleteRes.status).toBe(200);

    const deleteJson = await deleteRes.json();
    console.log("Test 4 - Delete cart response:", deleteJson);

    expect(deleteJson.message).toBe("Cart item deleted");

    // Verify the item is actually deleted
    const getReq = new NextRequest("http://localhost/api/cart");
    const getRes = await GET(getReq);
    const getJson = await getRes.json();
    expect(getJson.data.length).toBe(0);
  });
});
