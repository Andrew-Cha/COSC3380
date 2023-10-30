<script>
export default {
    data() {
        return {
            loanItem: {
                name: "Sample Book",
                dueDate: "2023-11-15",
            },
        };
    },
    methods: {
        returnItem() {
            // Add later
        },
        extendLoan() {
            // Add later
        },
    },
};
</script>

<template>
    <div class="loan-item-page">
        <h2>Library Loan Item Page</h2>
        <div class="loan-details">
            <h3>Item Information</h3>
            <p>Item Name: {{ loanItem.name }}</p>
            <p>Due Date: {{ loanItem.dueDate }}</p>
        </div>
        <button @click="returnItem" class="return-button">Return Item</button>
        <button @click="extendLoan" class="extend-button">Extend Item</button>
    </div>
</template>

  
<style scoped>
.loan-item-page {
    text-align: center;
    margin: 20px;
}

.loan-details {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
}

.return-button {
    background-color: grey;
    /* Red color, you can customize this */
    color: #fff;
    margin-right: 10px;
}

.extend-button {
    background-color: grey;
    /* Blue color, you can customize this */
    color: #fff;
}
</style>
  