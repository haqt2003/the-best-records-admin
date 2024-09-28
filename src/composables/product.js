import axios from "axios";

const getProducts = async () => {
  try {
    const response = await axios.get(
      "https://the-best-records-be.onrender.com/products"
    );
    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (productID) => {
  try {
    const response = await axios.get(
      `https://the-best-records-be.onrender.com/products/${productID}`
    );
    return response.data.product;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (data) => {
  try {
    const response = await axios.post(
      "https://the-best-records-be.onrender.com/products",
      {
        title: data.title,
        singer: data.singer,
        img: data.img,
        song: data.song,
        prePrice: data.prePrice,
        price: data.price,
        type: data.type,
        duration: data.duration,
        description: data.description,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (productID, data) => {
  try {
    const response = await axios.put(
      `https://the-best-records-be.onrender.com/products/${productID}`,
      {
        title: data.title,
        singer: data.singer,
        img: data.img,
        song: data.song,
        prePrice: data.prePrice,
        price: data.price,
        type: data.type,
        duration: data.duration,
        description: data.description,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (productID) => {
  try {
    const response = await axios.delete(
      `https://the-best-records-be.onrender.com/products/${productID}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getProducts, getProduct, addProduct, editProduct, deleteProduct };
