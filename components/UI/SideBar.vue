<template>
  <div id="mySidenav" class="sidenav">
    <div class="sidebar-header">
      <h3 class="title">Main Menu</h3>
      <a href="javascript:void(0)" class="closebtn">&times;</a>
    </div>
    <navigation-bar />
  </div>
</template>
<script>
import NavigationBar from '~/components/UI/NavigationBar.vue'

export default {
  components: {
    NavigationBar,
  },
  mounted() {
    const sideBar = document.getElementById('mySidenav')
    const togglebtn = document.querySelector('.navbar-toggler')
    const closebtn = document.querySelector('.closebtn')
    const sidemenuItems = document.querySelectorAll('.sidenav a')

    sidemenuItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()
        if (item.classList.contains('menu-item-has-children')) {
          const submenu = item.querySelector('.sub-menu')
          const itemsNum = item.querySelectorAll('.menu-item').length
          if (submenu.classList.contains('opened')) {
            item.classList.remove('child-menu-opened')
            submenu.classList.remove('opened')
            submenu.style.maxHeight = 0
          } else {
            item.classList.add('child-menu-opened')
            submenu.classList.add('opened')
            submenu.style.maxHeight = `${itemsNum * 64}px`
          }
        } else {
          sideBar.style.width = '0'
        }
      })
    })

    togglebtn.addEventListener('click', () => {
      sideBar.style.width = '100vw'
    })
    closebtn.addEventListener('click', () => {
      sideBar.style.width = '0'
    })
  },
}
</script>
<style lang="scss" scoped></style>
