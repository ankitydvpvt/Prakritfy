import { NavbarDemo} from "@/components/Universal/NavbarDemo"
export default function ProductPoster() {

  const products = [
    {
      id: 1,
      image: "/Product1.jpeg",
      name: "Shilajit Gold Resin",
      price: 1312,
      mrp: 1999,
      rating: 4.4,
      reviews: 2341,
    },
    {
      id: 2,
      image: "/Product2.jpeg",
      name: "Himalayan Shilajit",
      price: 999,
      mrp: 1599,
      rating: 4.2,
      reviews: 1820,
    },
    {
      id: 3,
      image: "/Product3.jpeg",
      name: "Herbal Juice",
      price: 1030,
      mrp: 1499,
      rating: 4.1,
      reviews: 980,
    },
    {
      id: 4,
      image: "/Product4.jpeg",
      name: "Wellness Capsule",
      price: 799,
      mrp: 1299,
      rating: 4.3,
      reviews: 1210,
    },
    {
      id: 5,
      image: "/Product5.jpeg",
      name: "Ayurvedic Oil",
      price: 899,
      mrp: 1399,
      rating: 4.0,
      reviews: 760,
    },
    {
      id: 6,
      image: "/Product1.jpeg",
      name: "Health Tonic",
      price: 699,
      mrp: 1099,
      rating: 4.5,
      reviews: 3120,
    },
  ];

  return (
    // <div className="bg-gradient-to-r from-[#025582] to-[#60b2a3] min-h-screen p-6">
    <div>
      <div className="bg-[#025582]">
        <NavbarDemo/>
      </div>
      <div className="bg-[#f0f0f0] min-h-screen p-6">
      
      <div className="max-w-7xl mx-auto">

        {/* 🔵 AMAZON STYLE HEADER */}
        <h1 className="text-2xl font-semibold mb-6">
          Results for <span className="text-orange-600">Health Products</span>
        </h1> 

        {/* 🧩 PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#fff] rounded shadow hover:scale-105 hover:shadow-lg transition p-4 flex flex-col"
            >
              {/* Product Image */}
              <div className="h-[180px] flex justify-center items-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product Title */}
              <h3 className="text-sm font-medium line-clamp-2 hover:text-orange-600 cursor-pointer mb-2">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center text-sm mb-2">
                <span className="text-yellow-500">
                  {"★".repeat(Math.floor(product.rating))}
                </span>
                <span className="text-gray-400 ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span className="text-lg font-bold">₹{product.price}</span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ₹{product.mrp}
                </span>
              </div>

              {/* Delivery */}
              <p className="text-xs text-gray-600 mb-4">
                FREE delivery <span className="font-semibold">Tomorrow</span>
              </p>

              {/* Buttons */}
              <div className="bg-white mt-5 hover:bg-black hover:text-white text-sm font-semibold py-2 rounded-4xl text-center hover:scale-105 mb-2">
                Add to Cart
              </div>

              <div className="bg-yellow-500 rounded-4xl text-center hover:scale-105 text-sm font-semibold text-white py-2 ">
                <button>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
