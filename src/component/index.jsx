import { useEffect, useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import logo from "./image/Mountain-logo-Design-Graphics-9785421-1-580x435.png";

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
        setProducts((prevData) => [...prevData, ...data.products]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  if (loading) {
    return <div>Loading !! Please wait ...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="image-header">
          <img src={logo} alt="" />
        </div>
        <div className="navbar-container">
          <nav className="navbar">
            <a href="#">Home</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
          </nav>
          <div>
            <FontAwesomeIcon icon={faMoon} />
          </div>
        </div>
      </div>

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
        <button onClick={() => setCount(count + 1)}>Load More Product</button>
      </div>
    </div>
  );
}
