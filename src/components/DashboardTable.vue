
<template>
	<div>
        <Toast />

        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id"
            @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" responsiveLayout="scroll">
            <template #header>
                <div class="table-header-container">
                    <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2" />
                    <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="name" header="Name" sortable></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />
                </template>
            </Column>
            <Column field="price" header="Price" sortable>
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.price)}}
                </template>
            </Column>
            <Column field="category" header="Category" sortable></Column>
            <Column field="rating" header="Reviews" sortable>
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                </template>
            </Column>
            <Column field="inventoryStatus" header="Status" sortable>
                <template #body="slotProps">
                    <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="orders-subtable">
                    <h5>Orders for {{slotProps.data.name}}</h5>
                    <DataTable :value="slotProps.data.orders" responsiveLayout="scroll">
                        <Column field="id" header="Id" sortable></Column>
                        <Column field="customer" header="Customer" sortable></Column>
                        <Column field="date" header="Date" sortable></Column>
                        <Column field="amount" header="Amount" sortable>
                            <template #body="slotProps" sortable>
                                {{formatCurrency(slotProps.data.amount)}}
                            </template>
                        </Column>
                        <Column field="status" header="Status" sortable>
                            <template #body="slotProps">
                                <span :class="'order-badge order-' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
                            </template>
                        </Column>
                        <Column headerStyle="width:4rem">
                            <template #body>
                                <Button icon="pi pi-search" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
	</div>
</template>

<script>
// import ProductService from './service/ProductService';

export default {
    name: 'DashboardTable',
    data() {
        return {
            products: null,
            expandedRows: [] 
        }
    },
    productService: null,
    created() {
        this.productService = new ProductService();
    },
    mounted() {
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
    },
    methods: {
        onRowExpand(event) {
            this.$toast.add({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
        },
        onRowCollapse(event) {
            this.$toast.add({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
        },
        expandAll() {
            this.expandedRows = this.products.filter(p => p.id);
            this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
        },
        collapseAll() {
            this.expandedRows = null;
            this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        }
    }
}
</script>

<style lang="scss" scoped>
.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

.orders-subtable {
    padding: 1rem;
}
</style>                    
