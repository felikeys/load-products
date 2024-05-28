import { useEffect, useState } from "react";
import "./styles.css";

export default function LoadMoreProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const data = await response.json();
      if (data && data.products && data.products.length) {
        // console.log(data.products);
        setProducts(data.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading !! Please wait ...</div>;
  }

  return (
    <div className="container">
      <div className="products-container">
        {products && products.length
          ? products.map((item) => {
              return (
                <div className="product" key={item.id}>
                  <div className="img-container">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>

                  <p>{item.title}</p>
                </div>
              );
            })
          : null}
      </div>
      <div className="button-container">
        <button>Load More Product</button>
      </div>
    </div>
  );
}
