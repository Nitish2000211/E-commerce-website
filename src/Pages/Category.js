import React, { useEffect, useState } from "react";
import productsData from "../data/productsData";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "../Components/Filter";
import Product from "../Components/Product";

const Category = ({addToCart}) => {
  const { id } = useParams();
  const [data, setData] = useState(
    id === "all"
      ? productsData
      : productsData.filter((item) => item.categoryId === id)
  );

  const [filterData, setFilterData] = useState(data);
  const [checkbox, setCheckbox] = useState({
    delivery: false,
    stock: false,
  });

  // Handle checkbox
  function handleChange(checkboxId) {
    setCheckbox({
      ...checkbox,
      [checkboxId]: !checkbox[checkboxId],
    });
  }

  useEffect(() => {
    if (checkbox.delivery === true && checkbox.stock === true) {
      setFilterData(data.filter((item) => item.inStock && item.delivery));
    } else if (checkbox.delivery === false && checkbox.stock === false) {
      setFilterData(data);
    } else {
      setFilterData(
        data.filter((item) =>
          checkbox.delivery ? item.delivery : item.inStock
        )
      );
    }
  }, [checkbox]);

  

  return (
    <div className="category-container d-flex justify-content-between my-5 gap-2">
      <Filter checkbox={checkbox} handleChange={handleChange} />
      <section className="category-box bg-white rounded-1">
        <ToastContainer />
        <Product addToCart={addToCart} filterData={filterData} />
      </section>
    </div>
  );
};
export default Category;
