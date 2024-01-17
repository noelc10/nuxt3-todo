<template>
  <v-app>
    <v-app-bar color="white" class="px-4 text-center">
      <v-app-bar-title class="mx-0">
        <div class="d-flex flex column justify-center">
          <NuxtLink :to="{ name: 'index' }" class="d-flex align-center text-black text-decoration-none">
            <span>
              <img
                src="/assets/img/todo.png"
                height="30px"
                width="30px"
                alt="app-icon"
                class="mr-2"
              />
            </span>
            To Do
          </NuxtLink>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4" style="min-height: 93vh;">
      <div>
        <NuxtPage />
      </div>
    </v-main>

    <confirm-dialog />
    <v-toast />
    
    <v-footer color="primary">
      <div class="px-4 py-2 text-center w-100">
        {{ new Date().getFullYear() }} — <strong>Nuxt 3 To Do</strong>
      </div>
    </v-footer>
  </v-app>
</template>


<style lang="scss" scoped>
.content {
  height: 85vh;
}

.v-footer {
  flex-shrink: 0;
}
</style>
