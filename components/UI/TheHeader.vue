<template>
  <div class="nav-container py-5">
    <div class="container">
      <nav class="flex max-w-7xl w-full justify-between items-center">
        <nuxt-link class="navbar-brand" to="/"> tailwind </nuxt-link>
        <button class="navbar-toggler block lg:hidden" type="button">
          <span class="navbar-toggler-icon">menu</span>
        </button>

        <div class="hidden lg:block">
          <navigation-bar />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import NavigationBar from '~/components/UI/NavigationBar.vue'
export default {
  components: { NavigationBar },
}
</script>

<style lang="scss"></style>
