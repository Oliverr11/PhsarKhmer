import "./App.css";
import { useGetProductsQuery } from "./features/product/productSlice2";
import CardProduct from "./components/card/card-product";
import SkeletonCardProduct from "./components/card/skeleton-card-product";
import { NavLink } from "react-router";

function App() {
  const { data, isLoading } = useGetProductsQuery();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  console.log("data from RTK Query", data);

  return (
    <>
      <main className="max-w-screen-xl mx-auto">
        <NavLink
          role="menuitem"
          aria-current="page"
          aria-haspopup="false"
          className="flex h-[40px] my-5 w-50 items-center gap-2 text-white rounded-md py-4 bg-emerald-500 transition-colors duration-300 hover:bg-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
          to="/add-product"
        >
          <span>Add Product</span>
        </NavLink>
        <section className="grid grid-cols-4 gap-5">
          {isLoading &&
            array.map((index) => <SkeletonCardProduct key={index} />)}
          {/* product section */}
          {!isLoading &&
            data?.map((p, index) => (
              <CardProduct
                key={index}
                thumbnail={p.images[0]}
                title={p.title}
                id={p.id}
              />
            ))}
        </section>
      </main>
    </>
  );
}

export default App;
