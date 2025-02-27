const pool = require('../config/database');
const format = require("pg-format");
const { getUserName } = require('./users');

const obtenerTotal = async (filtros, values) => {
  let queryTotal = "SELECT COUNT(*) FROM products";
  if (filtros.length > 0) {
      queryTotal += ` WHERE ${filtros.join(" AND ")}`;
  }
  const { rows } = await pool.query(queryTotal, values);
  return parseInt(rows[0].count);
};
// exports.getProducts = async ({ limits = 5, page = 1 }) => {
//   try {
//     const offset = Math.abs((page - 1) * limits);
//     const formatted = format("SELECT * FROM products LIMIT %s OFFSET %s", limits, offset)
//     const { rows } = await pool.query(formatted)
//     const total = await obtenerTotal()

//     let rowsNew = await Promise.all(rows.map(async (item) => {
//       let sellerName = await getUserName(item.seller);
//       return {
//         ...item,
//         seller_name: sellerName,
//       };
//     }))

//     return HATEOASFormat(rowsNew, total)

//   } catch (error) {
//     throw new Error("No se pudo obtener los productos");
//   }
// }

exports.filters = async ({ limits = 6, page = 1, precio_min, precio_max, categoria, sort, search }) => {
  const offset = Math.abs((page - 1) * limits);

  let filtros = [];
  let values = [];

  const agregar = (campo, comparador, valor) => {
    values.push(valor)
    const { length } = filtros
    filtros.push(`${campo} ${comparador} $${length + 1}`)
  }
  if (precio_min) {
    agregar("product_price", ">=", precio_min)
  }
  if (precio_max) {
    agregar("product_price", "<=", precio_max)
  }
  if (categoria) {
    agregar("product_category", "=", categoria)
  }

  if (search) {
    agregar("product_name", "ILIKE", `%${search}%`)
  }

  let text = "SELECT * FROM products";

  if (filtros.length > 0) {
    text += ` WHERE ${filtros.join(" AND ")}`;

  }

  if (sort) {
    const direction = sort === "desc" ? "desc" : "asc";
    text += ` ORDER BY product_price ${direction}`;
  }

  values.push(limits, offset);
  text += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

  let {rows} = await pool.query(text, values)

  const total = await obtenerTotal(filtros, values.slice(0, -2))
  console.log(total)
  let rowsNew = await Promise.all(rows.map(async (item) => {
    let sellerName = await getUserName(item.seller);
    return { ...item, seller_name: sellerName };
}));

return HATEOASFormat(rowsNew, total);
}

const HATEOASFormat = (array_products, total) => {
  const products = array_products.map((product) => ({
    id_product: product.id_product,
    product_name: product.product_name,
    product_description: product.product_description,
    product_quantity: product.product_quantity,
    product_price: product.product_price,
    product_photo: product.product_photo,
    product_category: product.product_category,
    seller_name: product.seller_name,
    href: `/api/productos/${product.id_product}`
  }))

  const resProducts = {
    "total": total,
    "results": products
  }
  return resProducts
}



exports.getProductById = async (id) => {
  try {
    const query = {
      text: "SELECT * FROM products WHERE id_product = $1",
      values: [id]
    };
    const { rows: product } = await pool.query(query);

    
      return product[0];
      
    } catch (error) {
      throw new Error("No se pudo obtener el producto");
    }
  }


exports.getMyProducts = async (id) => {
  try {

    const query = {
      text: "SELECT * FROM products WHERE seller = $1",
      values: [id]
    };

    const { rows: products } = await pool.query(query);
    if (products.length === 0) {
      throw new Error("El usuario no tiene productos registrados");
    }
    return products;
  } catch (error) {
    throw new Error("No se pudo obtener los productos del usuario");
  }
}

exports.getMyProductsById = async (idUser, idProduct) => {
  try {

    const query = {
      text: "SELECT * FROM products WHERE seller = $1 and id_product = $2",
      values: [idUser, idProduct]
    };
    
    const { rows: product } = await pool.query(query);
    if (!product[0]) {
      throw new Error("El producto no existe");
    }

    return product[0];
  } catch (error) {
    throw new Error("No se pudo obtener los productos del usuario");
  }
}


exports.putMyProductsById = async (idUser, idProduct, dataProduct) => {
  try {
    const {product_name, product_description, product_price, product_quantity, product_photo,product_category} = dataProduct 
    const query = {
      text: `UPDATE products 
      set product_name = $3, product_description = $4, product_price = $5, product_quantity = $6, product_photo = $7, product_category = $8
      WHERE seller = $1 and id_product = $2 RETURNING *`,
      values: [idUser, idProduct, product_name, product_description, product_price, product_quantity, product_photo, product_category]
    };

    const { rows: product } = await pool.query(query);

    return product[0];
  } catch (error) {
    throw new Error("No se pudo obtener los productos del usuario");
  }
}

exports.deleteMyProductsById = async (idUser, idProduct) => {
  try {

    const query = {
      text: "DELETE FROM products WHERE seller = $1 and id_product = $2",
      values: [idUser, idProduct]
    };
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw new Error("El producto no existe");
    }
    return { message: "Producto eliminado" };
  } catch (error) {
    throw new Error("No se pudo eliminar el producto");
  }
}




exports.newProduct = async (product_name, product_description, product_price, product_quantity, product_photo, product_category, id_user ) =>{
  try {
    const query = 'INSERT INTO products(product_name, product_description, product_price, product_quantity, product_photo, product_category, seller) VALUES ($1,$2,$3,$4,$5,$6,$7)';
    const values = [product_name, product_description, product_price, product_quantity, product_photo, product_category, id_user]
    const {rows} = await pool.query(query,values)
  
    return rows[0]
  } catch (error) {
    throw new Error("No se pudo agregar el nuevo producto");
  }
 
}

exports.searchProduct = async() =>{
  try {
    const {rows: productsTotal } = await pool.query('SELECT * FROM products')
    return productsTotal

  } catch (error) {
    throw new Error("No se pudo obtener todos los productos");
  }
 
  
}