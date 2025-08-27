import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "@/app/lib/validation";

const categories = ["Coats", "Shirts", "Dresses", "Sweaters", "Pants"];
const Modal = ({
  setIsAddDialogOpen,
  handleAddProduct,
}: {
  setIsAddDialogOpen: (open: boolean) => void;
  handleAddProduct: SubmitHandler<ProductFormData>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      originalPrice: 0,
      stock: 0,
      colors: "",
      sizes: "",
      description: "",
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal content */}
      <div className="bg-[#212328]  rounded-lg shadow-lg w-full max-w-2xl p-6">
        <header className="mb-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
        </header>

        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                {...register("name")}
                placeholder="Enter product name"
                className="w-full border rounded px-2 py-1"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...register("category")}
                className="w-full border rounded px-2 py-1"
              >
                {categories.map((cat) => (
                  <option
                    className="bg-[#212328] text-white"
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="price">Current Price</label>
              <input
                id="price"
                type="number"
                {...register("price")}
                placeholder="0.00"
                className="w-full border rounded px-2 py-1"
              />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="originalPrice">Original Price</label>
              <input
                id="originalPrice"
                type="number"
                {...register("originalPrice")}
                placeholder="0.00"
                className="w-full border rounded px-2 py-1"
              />
              {errors.originalPrice && (
                <p className="text-red-500 text-xs">
                  {errors.originalPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                id="stock"
                type="number"
                {...register("stock")}
                placeholder="0"
                className="w-full border rounded px-2 py-1"
              />
              {errors.stock && (
                <p className="text-red-500 text-xs">{errors.stock.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="colors">Colors (comma-separated)</label>
              <input
                id="colors"
                {...register("colors")}
                placeholder="Red, Blue, Green"
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="sizes">Sizes (comma-separated)</label>
              <input
                id="sizes"
                {...register("sizes")}
                placeholder="XS, S, M, L, XL"
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Enter product description"
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(false)}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
