<template>
  <nav>
    <div class="btn-group" role="group" aria-label="Basic example">
      <router-link to="/" class="btn btn-primary">Người dùng</router-link>
      <router-link to="/products" class="btn btn-primary">Sản phẩm</router-link>
    </div>
    <button @click="logout" type="button" class="btn btn-danger">
      Đăng xuất
    </button>
  </nav>
  <div class="about">
    <p class="h2">Danh sách sản phẩm</p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên bài hát</th>
          <th scope="col">Ca sĩ</th>
          <th scope="col">Ảnh</th>
          <th scope="col">Đường dẫn bài hát</th>
          <th scope="col">Thể loại</th>
          <th scope="col">Thời gian</th>
          <th scope="col">Giá trước giảm</th>
          <th scope="col">Giá</th>

          <th class="text-end">
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalAdd"
            >
              Thêm
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.singer }}</td>
          <td><a :href="item.img" target="_blank">Đường dẫn</a></td>
          <td><a :href="item.song" target="_blank">Đường dẫn</a></td>
          <td>{{ item.type }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ item.prePrice || "Không có" }}</td>
          <td>{{ item.price }}</td>

          <td class="text-end">
            <button
              @click="editPro(item._id)"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalEdit"
            >
              Sửa
            </button>
            <button
              @click="delProduct(item._id)"
              type="button"
              class="btn btn-danger ml"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Add -->
    <div
      class="modal fade"
      id="modalAdd"
      tabindex="-1"
      aria-labelledby="modalAddLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="addNewProduct()" class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalAddLabel">Thêm sản phẩm</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="row">
                <div class="col">
                  <label for="title" class="form-label">Tên bài hát</label>
                  <input
                    v-model="product.title"
                    type="text"
                    class="form-control"
                    id="title"
                    name="title"
                  />
                </div>
                <div class="col">
                  <label for="singer" class="form-label">Ca sĩ</label>
                  <input
                    v-model="product.singer"
                    type="text"
                    class="form-control"
                    id="singer"
                    name="singer"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="image" class="form-label mt-3">Hình ảnh</label>
                  <input
                    v-model="product.img"
                    type="text"
                    class="form-control"
                    id="image"
                    name="img"
                  />
                </div>
                <div class="col">
                  <label for="song" class="form-label mt-3">Đường dẫn bài hát</label>
                  <input
                    v-model="product.song"
                    type="text"
                    class="form-control"
                    id="song"
                    name="song"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <label for="type" class="form-label">Thể loại</label>
                  <input
                    v-model="product.type"
                    type="text"
                    class="form-control"
                    id="type"
                    name="type"
                  />
                </div>
                <div class="col">
                  <label for="duration" class="form-label">Thời gian</label>
                  <input
                    v-model="product.duration"
                    type="text"
                    class="form-control"
                    id="duration"
                    name="duration"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <label for="prePrice" class="form-label">Giá trước giảm</label>
                  <input
                    v-model="product.prePrice"
                    type="text"
                    class="form-control"
                    id="prePrice"
                    name="prePrice"
                  />
                </div>
                <div class="col">
                  <label for="price" class="form-label">Giá</label>
                  <input
                    v-model="product.price"
                    type="text"
                    class="form-control"
                    id="price"
                    name="price"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Mô tả</label>
              <textarea
                v-model="product.description"
                class="form-control"
                id="description"
                rows="4"
                name="description"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Thêm
            </button>
          </div>
        </div>
      </form>
    </div>
    <!-- Edit -->
    <div
      class="modal fade"
      id="modalEdit"
      tabindex="-1"
      aria-labelledby="modalEditLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="edit()" class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalEditLabel">Sửa sản phẩm</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="row">
                <div class="col">
                  <label for="title" class="form-label">Tên bài hát</label>
                  <input
                    v-model="productEdit.title"
                    type="text"
                    class="form-control"
                    id="title"
                  />
                </div>
                <div class="col">
                  <label for="singer" class="form-label">Ca sĩ</label>
                  <input
                    v-model="productEdit.singer"
                    type="text"
                    class="form-control"
                    id="singer"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="image" class="form-label mt-3">Hình ảnh</label>
                  <input
                    v-model="productEdit.img"
                    type="text"
                    class="form-control"
                    id="image"
                  />
                </div>
                <div class="col">
                  <label for="song" class="form-label mt-3">Đường dẫn bài hát</label>
                  <input
                    v-model="productEdit.song"
                    type="text"
                    class="form-control"
                    id="song"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <label for="type" class="form-label">Thể loại</label>
                  <input
                    v-model="productEdit.type"
                    type="text"
                    class="form-control"
                    id="type"
                  />
                </div>
                <div class="col">
                  <label for="duration" class="form-label">Thời gian</label>
                  <input
                    v-model="productEdit.duration"
                    type="text"
                    class="form-control"
                    id="duration"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <label for="prePrice" class="form-label">Giá trước giảm</label>
                  <input
                    v-model="productEdit.prePrice"
                    type="text"
                    class="form-control"
                    id="prePrice"
                  />
                </div>
                <div class="col">
                  <label for="price" class="form-label">Giá</label>
                  <input
                    v-model="productEdit.price"
                    type="text"
                    class="form-control"
                    id="price"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Mô tả</label>
              <textarea
                v-model="productEdit.description"
                class="form-control"
                id="description"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import {
  getProducts,
  deleteProduct,
  addProduct,
  editProduct,
  getProduct,
} from "@/composables/product";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const products = ref([]);
    const product = ref({
      title: "",
      singer: "",
      img: "",
      song: "",
      prePrice: "",
      price: "",
      type: "",
      duration: "",
      description: "",
    });
    const productEdit = ref({
      title: "",
      singer: "",
      img: "",
      song: "",
      prePrice: "",
      price: "",
      type: "",
      duration: "",
      description: "",
    });
    const currentProductID = ref("");

    async function addNewProduct() {
      await addProduct(product.value);
      products.value = await getProducts();
    }

    async function editPro(productID) {
      currentProductID.value = productID;
      productEdit.value = await getProduct(productID);
    }

    async function edit() {
      await editProduct(currentProductID.value, productEdit.value);
      products.value = await getProducts();
    }

    async function delProduct(productID) {
      await deleteProduct(productID);
      products.value = await getProducts();
    }

    function logout() {
      sessionStorage.clear();
      router.push("/signin");
    }

    onBeforeMount(async () => {
      products.value = await getProducts();
    });
    return {
      products,
      product,
      productEdit,
      currentProductID,
      addNewProduct,
      editPro,
      edit,
      delProduct,
      logout,
    };
  },
};
</script>

<style>
.table {
  margin-top: 20px;
}

button {
  margin: 0;
  padding: 0;
}

.over {
  overflow: hidden;
}

.ml {
  margin-left: 12px;
}
</style>
