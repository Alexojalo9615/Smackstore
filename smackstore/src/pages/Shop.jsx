import React from "react";
import "../pages/style/Shop.css";
import { Link } from "react-router-dom";


const Shop = () => {

    return (
        <div className="shop-container">
            <h1 className="shop-title">Tutti i prodotti</h1>

            <div className="products-grid">
                <h2>Le Nostre Collezioni</h2>
                <div className="product-card">
                    <Link to="/shop/magliette" className="category-card shirts">Magliette</Link>
                    <Link to="/shop/action-figures" className="category-card figures">Action Figures</Link>
                    <Link to="/shop/cover" className="category-card covers">Cover</Link>
                </div>
            </div>
        </div>
    );
}

export default Shop;