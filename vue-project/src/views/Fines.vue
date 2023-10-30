<script>
export default {
    data() {
        return {
            fines: [
                { id: 1, user: 'John Doe', book: 'The Lightning Thief', amount: 3.75, dueDate: '10-26-2023' },
                { id: 2, user: 'Jane Doe', book: 'The Hunger Games', amount: 1.50, dueDate: '10-25-2023' },
                { id: 3, user: 'Jason Doe', book: 'Databases V2 Textbook', amount: 5.50, dueDate: '10-21-2023' },
                { id: 4, user: 'Jordan Doe', book: 'Captain Underpants', amount: 4.50, dueDate: '10-22-2023' },
                // ... more fines
            ],
            filteredFines: [],
            showUsersDropdown: false,
            showNamesDropdown: false,
        };
    },
    computed: {
        uniqueUsers() {
            return [...new Set(this.fines.map(fine => ({ id: fine.id, name: fine.user })))];
        },
        uniqueNames() {
            return [...new Set(this.fines.map(fine => fine.user))];
        }
    },
    methods: {
        filterByUserId(id) {
            this.filteredFines = this.fines.filter(fine => fine.id === id);
        },
        filterByName(name) {
            this.filteredFines = this.fines.filter(fine => fine.user === name);
        },
        resetFilter() {
            this.filteredFines = this.fines;
            this.showUsersDropdown = false;
            this.showNamesDropdown = false;
        },
    },
    mounted() {
        this.resetFilter();
    }
};
</script>

<template>
    <div class="fines-page">
        <h1>Fines Page</h1>

        <div>
            <div class="filters">
                <button @click="showUsersDropdown = !showUsersDropdown">User ID</button>
                <div v-if="showUsersDropdown" class="dropdown">
                    <button v-for="user in uniqueUsers" :key="user.id" @click="filterByUserId(user.id)">
                        {{ user.id }}
                    </button>
                    <button @click="resetFilter">Back</button>
                </div>

                <button @click="showNamesDropdown = !showNamesDropdown">Name</button>
                <div v-if="showNamesDropdown" class="dropdown">
                    <button v-for="name in uniqueNames" :key="name" @click="filterByName(name)">
                        {{ name }}
                    </button>
                    <button @click="resetFilter">Back</button>
                </div>
            </div>

            <div v-if="filteredFines.length > 0">
                <div class="fine" v-for="fine in filteredFines" :key="fine.id">
                    <h3>{{ fine.user }}</h3>
                    <p>Book: {{ fine.book }}</p>
                    <p>Amount: ${{ fine.amount.toFixed(2) }}</p>
                    <p>Due Date: {{ fine.dueDate }}</p>
                </div>
            </div>
            <div v-else>
                <p>No fines to display</p>
            </div>
            <div class="library-image">
                <img src="@/assets/library.jpeg" alt="Library">
            </div>
        </div>
    </div>
</template>

  
<style scoped>
.fines-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.fine {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.library-image {
    margin-top: 20px;
    text-align: center;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.filters {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.dropdown {
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
}
</style>
  
  