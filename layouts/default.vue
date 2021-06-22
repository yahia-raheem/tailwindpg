<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    const headCss =
      this.$i18n.locale === 'en'
        ? [{ rel: 'stylesheet', href: '/gulpdist/css/bundle.css' }]
        : [{ rel: 'stylesheet', href: '/gulpdist/css/bundle-rtl.css' }]

    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      meta: [...i18nHead.meta],
      link: [...i18nHead.link, ...headCss],
    }
  },
}
</script>
<style></style>
