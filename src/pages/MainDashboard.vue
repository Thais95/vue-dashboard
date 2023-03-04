<template>
  <main class="container">
    <DashboardTable />

  </main>
</template>

<script>
import DashboardTable from '../components/DashboardTable.vue';

export default {
  name: "MainDashboard",
  components: { DashboardTable }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>