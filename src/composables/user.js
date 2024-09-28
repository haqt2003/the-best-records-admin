import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get(
      "https://the-best-records-be.onrender.com/users"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (userID) => {
  try {
    const response = await axios.get(
      `https://the-best-records-be.onrender.com/users/${userID}`
    );
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (data) => {
  try {
    const response = await axios.post(
      "https://the-best-records-be.onrender.com/users",
      {
        name: data.name,
        phonenumber: data.phonenumber,
        email: data.email,
        avatar: data.avatar,
        password: data.password,
        address: {
          province: data.address.province,
          district: data.address.district,
          ward: data.address.ward,
          detail: data.address.detail,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (userID, data) => {
  try {
    const response = await axios.put(
      `https://the-best-records-be.onrender.com/users/${userID}`,
      {
        name: data.name,
        phonenumber: data.phonenumber,
        email: data.email,
        avatar: data.avatar,
        password: data.password,
        address: {
          province: data.address.province,
          district: data.address.district,
          ward: data.address.ward,
          detail: data.address.detail,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userID) => {
  try {
    const response = await axios.delete(
      `https://the-best-records-be.onrender.com/users/${userID}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, getUser, addUser, editUser, deleteUser };
