<template>
  <main class="container">
    <MenuBar />
    <DashboardTable />
  </main>
</template>

<script>
import DashboardTable from '../components/DashboardTable.vue';
import MenuBar from '../components/MenuBar.vue';

export default {
  name: "MainDashboard",
  components: { DashboardTable, MenuBar }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
