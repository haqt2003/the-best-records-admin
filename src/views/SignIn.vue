<template>
  <div class="screen">
    <h2 class="text-center">THE BEST RECORDS</h2>
    <form @submit.prevent="enter()">
      <div class="mb-3">
        <label for="username" class="form-label">Tên đăng nhập</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          autocomplete="current-username"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          autocomplete="current-password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import { signin } from "@/composables/admin";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const username = ref(null);
    const password = ref(null);

    async function enter() {
      const response = await signin({
        username: username.value,
        password: password.value,
      });
      if (response) {
        sessionStorage.setItem("usernameAdmin", response.username);
        router.push({ name: "User" });
      }
    }

    return { username, password, enter };
  },
};
</script>

<style scoped>
.screen {
  margin-top: 160px;
}
h2 {
  font-weight: 700;
}
form {
  max-width: 500px;
  margin: auto;
  margin-top: 40px;
}
button {
  margin: auto;
  display: block;
  width: 100%;
}
</style>
