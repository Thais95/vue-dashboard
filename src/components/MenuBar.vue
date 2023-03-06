<template>
<Menubar class="menu">
  <template #start>
    <div class="logo-name">
      <img src="../assets/logo.ico" alt="Logo">
      <span>Nome da Empresa</span>
    </div>
    <nav class="nav">
      <ul>
        <li>Início</li>
        <li>Disputas</li>
        <li>Minhas Licitações</li>
        <li>Extra</li>
      </ul>
    </nav>
  </template>
  <template #end>
    <div class="signout">
      <span>Sair</span>
      <i class="pi pi-sign-out" style="font-size: 1.4rem;"></i>
    </div>
  </template>
</Menubar>
</template>

<script>
export default {
  name: 'MenuBar'
}
</script>

<style lang="scss" scoped>
.menu {
  widows: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  .logo-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between !important;
    height: 60px;
    gap: 20px;
    cursor: default;
    user-select: none;
    img {
      width: 34px;
      height: 34px;
    }
    span {
      font-weight: 500;
      font-size: 1.34rem;
      color: var(---primary);
    }
  }
  .signout {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: var(---primary);
      transition: 0.2s;
    }
  }
}
</style>
