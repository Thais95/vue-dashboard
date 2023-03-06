<template>
<Menubar class="menu">
  <template #start>
    <div class="start-wrapper">
      <div class="logo-name">
        <img src="../assets/logo.ico" alt="Logo">
        <span>Nome da Empresa</span>
      </div>
      <nav>
        <ul class="nav-links">
          <li>Início</li>
          <li class="active">Licitações</li>
          <li>Disputas</li>
          <li>Minha conta</li>
        </ul>
      </nav>
    </div>
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
  height: 80px;
  z-index: 2;
  @media screen and (max-width: 760px) {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .start-wrapper {
    display: flex;
    align-items: center;
    gap: 62px;
    @media screen and (max-width: 760px) {
      flex-direction: column;
      gap: 20px;
    }
  }
  .logo-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between !important;
    gap: 10px;
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
  .nav-links {
    display: flex;
    flex-direction: row;
    gap: 18px;
    @media screen and (max-width: 760px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .active {
      color: var(---primary);
    }
    li {
      font-weight: 500;
      cursor: pointer;
      color: darken($color: #008cff, $amount: 26);
      transition: 0.2s;
      &:hover {
        transition: 0.2s;
        color: var(---accent);
      }
    }
  }
  .signout {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    cursor: pointer;
    color: darken($color: #008cff, $amount: 26);
    transition: 0.2s;
    &:hover {
      transition: 0.2s;
      color: var(---accent);
    }
  }
}
</style>
