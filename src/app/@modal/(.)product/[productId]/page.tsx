import Modal from "@/app/components/Modal";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  hasCountdown?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Trendy Brown Coat",
    category: "Coats",
    price: 75.0,
    originalPrice: 150.0,
    discount: 50,
    rating: 4.8,
    image: "/fourbyfive.png",
    hasCountdown: true,
  },
  {
    id: 2,
    name: "Classy Light Coat",
    category: "Coats",
    price: 165.0,
    originalPrice: 220.0,
    discount: 25,
    rating: 4.9,
    image: "/coat.png",
  },
  {
    id: 3,
    name: "Modern Brown Dress",
    category: "Dresses",
    price: 90.0,
    originalPrice: 100.0,
    discount: 10,
    rating: 4.8,
    image: "/coat.png",
  },
  {
    id: 4,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/coat.png",
  },
  {
    id: 5,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/coat.png",
  },
  {
    id: 6,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/coat.png",
  },
];

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const selectedImg = Object.values(products).find((img: Product) => {
    return img.id === Number(productId);
  });
  if (!selectedImg) {
    return <div>Image not found</div>;
  }

  return (
    <Modal id={selectedImg.id}>
      <div className="relative w-120 h-80 mb-4">
        <p className="text-5xl ">{selectedImg.image}</p>
        <p>intercepted</p>
      </div>
    </Modal>
  );
};

export default page;
