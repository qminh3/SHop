import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const clickCategory = (event) => {
    if (category.includes(event.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setCategory((prev) => [...prev, event.target.value]);
    }
  };

  const clickSubCategory = (event) => {
    if (subCategory.includes(event.target.value)) {
      setSubCategory((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, event.target.value]);
    }
  };

  // handle filter
  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProduct(productCopy);
  };
  // handle sort change
  const sortProduct = (sortType) => {
    let productCopy = filterProducts.slice();
    if (sortType == "low-hight") {
      setFilterProduct(productCopy.sort((a, b) => a.price - b.price));
    }
    if (sortType == "hight-low") {
      setFilterProduct(productCopy.sort((a, b) => b.price - a.price));
    } else {
      applyFilter();
    }
  };
  useEffect(() => {
    sortProduct(sortType);
  }, [sortType]);
  //
  // handle filter change
  useEffect(() => {
    applyFilter();
  }, [subCategory, category, search, showSearch, products]);
  // handle sort change

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-9 pt-10 border-t mb-10">
      {/* filer option bên trái  */}
      <div className="min-w-60">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-secondary"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden px-3  ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* category */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 rounded-xl
          } sm:block `}
        >
          <p className="mb-3 text-sm font-bold text-color ">Danh mục</p>
          <div className="flex flex-col gap-2 text-sm font-light text-color">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 "
                value={"Men"}
                onChange={clickCategory}
              />
              Đồ Nam
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={clickCategory}
              />
              Đồ Nữ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={clickCategory}
              />
              Đồ Trẻ Em
            </p>
          </div>
        </div>
        {/* lọc theo giá tiền */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-6  rounded-xl ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-bold text-color  ">Kiểu Dáng</p>
          <div className="flex flex-col gap-2 text-sm font-light text-color">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={clickSubCategory}
              />
              Áo
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={clickSubCategory}
              />
              Quần
            </p>
          </div>
        </div>
      </div>
      {/* san pham */}
      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-5">
          {/* <Title text1={"ALL"} text2={"COLLECTION"} /> */}
          
          <p className="text-2xl font-bold text-black ">ALL COLLECTION </p>
          {/* SAP XEP DANH SACH */}
          <select
            name=""
            id=""
            className="border-2 border-gray-400 text-sm px-2 text-color"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent"> Relevent</option>
            <option value="low-hight"> Low to High</option>
            <option value="hight-low">High to Low</option>
          </select>
        </div>

        {/* product list */}
        <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
