<template>
  <section class="page homepage">
    <div class="container">
      <div class="flex-wrap flex">
        <div class="w-full">
          <nuxt-link
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            >{{ locale.name }}</nuxt-link
          >
        </div>
        <div class="w-full md:w-1/4 lg:w-1/5">
          <p class="text-primary bg-secondary ps-3">hey</p>
        </div>
        <div class="w-full md:w-1/4 lg:w-1/5">
          <p class="">hey</p>
        </div>
        <div class="w-full md:w-1/4 lg:w-1/5">
          <p class="">hey</p>
        </div>
        <div class="w-full md:w-1/4 lg:w-1/5">
          <p class="">hey</p>
        </div>
        <div class="w-full md:w-1/4 lg:w-1/5">
          <p class="">hey</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>

<style></style>
