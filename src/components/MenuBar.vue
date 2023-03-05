<template>
<Menubar>
  <template #start>
    <nav class="menu-bar">
      <div class="menu-icon">
        <img src="../../public/favicon.ico" alt="Logo">
        <span>Dashboard de Licitações</span>
      </div>
      <div class="signout">
        <span>Sair</span>
        <i class="pi pi-sign-out" style="font-size: 1.4rem"></i>
      </div>
    </nav>
  </template>
</Menubar>
</template>

<script>
export default {
  name: 'MenuBar'
}
</script>

<style lang="scss" scoped>
.menu-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between !important;
  .menu-icon {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    gap: 20px;
    cursor: default;
    user-select: none;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      font-weight: 600;
      font-size: 1.2rem;
      color: #008cff;
    }
  }
  .signout {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
