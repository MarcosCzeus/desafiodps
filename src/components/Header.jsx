import React, { useState } from 'react';

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = (product) => {
    const updatedProducts = allProducts.map((item) => {
      if (item.id === product.id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else if (item.id === product.id && item.quantity === 1) {
        return null;
      } else {
        return item;
      }
    }).filter(Boolean);

    setAllProducts(updatedProducts);
    updateTotal(updatedProducts);
  };

  const onQuantityChange = (product, quantity) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === product.id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setAllProducts(updatedProducts);
    updateTotal(updatedProducts);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const updateTotal = (updatedProducts) => {
    let totalPrice = 0;
    let totalProducts = 0;
    updatedProducts.forEach((product) => {
      totalPrice += product.price * product.quantity;
      totalProducts += product.quantity;
    });
    setTotal(totalPrice);
    setCountProducts(totalProducts);
  };

  return (
    <header>
      <h1 className='letracolor'>Café Himalaya</h1>
      <div className='container-icon'>
        <div className='container-cart-icon' onClick={() => setActive(!active)}>
          <img
            src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png"
            alt="carrito"
            className="icon-cart"
          />
          {countProducts > 0 && (
            <div className='count-products'>
              <span id='contador-productos'>{countProducts}</span>
            </div>
          )}
        </div>
        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts && allProducts.length > 0 ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className='cart-product' key={product.id}>
                    <div className='info-cart-product'>
                      <span className='cantidad-producto-carrito'>
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => onQuantityChange(product, e.target.value)}
                        />
                      </span>
                      <p className='titulo-producto-carrito'>{product.title}</p>
                      <span className='precio-producto-carrito'>${product.price}</span>
                    </div>
                    <img
                      src={product.urlImage}
                      alt={product.title}
                      className="thumbnail-producto-carrito"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1017/1017530.png"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>
              <div className='cart-total'>
                <h3 className='letracolor'>Total a Pagar:</h3>
                <span className='total-pagar'>${total}</span>
              </div>
              <button className='btn-clear-all letracolor' onClick={onCleanCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            <p className='cart-empty letracolor'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
