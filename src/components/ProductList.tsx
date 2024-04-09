import React, { useEffect, useState } from 'react'

const ProductList = ({category}: {category: string}) => {

    const [products, setProducts] = useState<string[]>([]);

    // const fetchProducts = async () => {

    //     const response = await fetch("https://fakestoreapi.com/products");
    //     const data = await response.json();
    //     setProducts(data);
    // }

    useEffect(() => {
        console.log("fetching products in ", category);
        setProducts(["Product 1", "Product 2", "Product 3"]);
    }, [category]);

  return (
    <div>ProductList</div>
  )
}

export default ProductList