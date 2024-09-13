<template>
  <nav>
    <div class="btn-group" role="group" aria-label="Basic example">
      <router-link to="/" class="btn btn-primary">User</router-link>
      <router-link to="/products" class="btn btn-primary">Product</router-link>
    </div>

    <button @click="logout" type="button" class="btn btn-danger">
      Sign out
    </button>
  </nav>
  <div class="home">
    <p class="h2">Danh sách người dùng</p>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Email</th>
          <th scope="col">Avatar</th>
          <th scope="col">Province</th>
          <th scope="col">District</th>
          <th scope="col">Ward</th>
          <th scope="col">Detail</th>
          <th class="text-end">
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalAdd"
            >
              Add
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.phonenumber || "Không có" }}</td>
          <td>{{ item.email }}</td>
          <td><a :href="item.avatar" target="_blank">Link</a></td>
          <td>{{ item.address.province || "Không có" }}</td>
          <td>{{ item.address.district || "Không có" }}</td>
          <td>{{ item.address.ward || "Không có" }}</td>
          <td>{{ item.address.detail || "Không có" }}</td>
          <td class="text-end">
            <button
              @click="editU(item._id)"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalEdit"
            >
              Edit
            </button>
            <button
              @click="delUser(item._id)"
              type="button"
              class="btn btn-danger ml"
            >
              Delete
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
      <form @submit.prevent="addNewUser()" class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalAddLabel">Add user</h1>
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
                  <label for="name" class="form-label">Name</label>
                  <input
                    v-model="user.name"
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                  />
                </div>
                <div class="col">
                  <label for="phonenumber" class="form-label"
                    >Phone Number</label
                  >
                  <input
                    v-model="user.phonenumber"
                    type="text"
                    class="form-control"
                    id="phonenumber"
                  />
                </div>
                <div class="col">
                  <label for="avatar" class="form-label">Avatar</label>
                  <input
                    v-model="user.avatar"
                    type="avatar"
                    class="form-control"
                    id="avatar"
                    name="avatar"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="email" class="form-label mt-3">Email</label>
                  <input
                    v-model="user.email"
                    type="text"
                    class="form-control"
                    id="email"
                  />
                </div>
                <div class="col">
                  <label for="password" class="form-label mt-3">Password</label>
                  <input
                    v-model="user.password"
                    type="text"
                    class="form-control"
                    id="password"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <label for="province" class="form-label">Province</label>
                  <input
                    v-model="user.address.province"
                    type="text"
                    class="form-control"
                    id="province"
                    name="province"
                  />
                </div>
                <div class="col">
                  <label for="district" class="form-label">District</label>
                  <input
                    v-model="user.address.district"
                    type="text"
                    class="form-control"
                    id="district"
                  />
                </div>
                <div class="col">
                  <label for="ward" class="form-label">Ward</label>
                  <input
                    v-model="user.address.ward"
                    type="text"
                    class="form-control"
                    id="ward"
                    name="ward"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="detail" class="form-label">Detail address</label>
              <textarea
                v-model="user.address.detail"
                class="form-control"
                id="detail"
                rows="4"
                name="detail"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-success"
              data-bs-dismiss="modal"
            >
              Add
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
            <h1 class="modal-title fs-5" id="modalEditLabel">Edit user</h1>
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
                  <label for="name" class="form-label">Name</label>
                  <input
                    v-model="userEdit.name"
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                  />
                </div>
                <div class="col">
                  <label for="phonenumber" class="form-label"
                    >Phone Number</label
                  >
                  <input
                    v-model="userEdit.phonenumber"
                    type="text"
                    class="form-control"
                    id="phonenumber"
                  />
                </div>
                <div class="col">
                  <label for="avatar" class="form-label">Avatar</label>
                  <input
                    v-model="userEdit.avatar"
                    type="avatar"
                    class="form-control"
                    id="avatar"
                    name="avatar"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="email" class="form-label mt-3">Email</label>
                  <input
                    v-model="userEdit.email"
                    type="text"
                    class="form-control"
                    id="email"
                  />
                </div>
                <div class="col">
                  <label for="password" class="form-label mt-3">Password</label>
                  <input
                    v-model="userEdit.password"
                    type="text"
                    class="form-control"
                    id="password"
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <label for="province" class="form-label">Province</label>
                  <input
                    v-model="userEdit.address.province"
                    type="text"
                    class="form-control"
                    id="province"
                    name="province"
                  />
                </div>
                <div class="col">
                  <label for="district" class="form-label">District</label>
                  <input
                    v-model="userEdit.address.district"
                    type="text"
                    class="form-control"
                    id="district"
                  />
                </div>
                <div class="col">
                  <label for="ward" class="form-label">Ward</label>
                  <input
                    v-model="userEdit.address.ward"
                    type="text"
                    class="form-control"
                    id="ward"
                    name="ward"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="detail" class="form-label">Detail address</label>
              <textarea
                v-model="userEdit.address.detail"
                class="form-control"
                id="detail"
                rows="4"
                name="detail"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  addUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from "@/composables/user";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const users = ref([]);
    const user = ref({
      name: "",
      phonenumber: "",
      email: "",
      avatar: "",
      password: "",
      address: {
        province: "",
        district: "",
        ward: "",
        detail: "",
      },
    });
    const userEdit = ref({
      name: "",
      phonenumber: "",
      email: "",
      avatar: "",
      password: "",
      address: {
        province: "",
        district: "",
        ward: "",
        detail: "",
      },
    });
    const currentUserID = ref("");

    async function addNewUser() {
      await addUser(user.value);
      users.value = await getUsers();
    }

    async function editU(userID) {
      currentUserID.value = userID;
      userEdit.value = await getUser(userID);
    }

    async function edit() {
      await editUser(currentUserID.value, userEdit.value);
      users.value = await getUsers();
    }

    async function delUser(usserID) {
      await deleteUser(usserID);
      users.value = await getUsers();
    }

    function logout() {
      sessionStorage.clear();
      router.push("/signin");
    }

    onBeforeMount(async () => {
      users.value = await getUsers();
    });
    return {
      users,
      user,
      userEdit,
      currentUserID,
      addNewUser,
      editU,
      edit,
      delUser,
      logout,
    };
  },
};
</script>

<style>
.table {
  margin-top: 20px;
}

.ml {
  margin-left: 12px;
}
</style>
