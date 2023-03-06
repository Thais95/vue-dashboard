<template>
  <main class="container">
    <MenuBar />
    <DashboardHeader />
    <DashboardTable />
  </main>
</template>

<script>
import DashboardHeader from '../components/DashboardHeader.vue';
import DashboardTable from '../components/DashboardTable.vue';
import MenuBar from '../components/MenuBar.vue';

export default {
  name: "MainDashboard",
  components: { DashboardTable, MenuBar, DashboardHeader }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
