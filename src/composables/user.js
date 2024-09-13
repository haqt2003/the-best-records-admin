import axios from "axios";

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (userID) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userID}`);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/users", {
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
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (userID, data) => {
  try {
    const response = await axios.put(`http://localhost:3000/users/${userID}`, {
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
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userID) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/users/${userID}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, getUser, addUser, editUser, deleteUser };
