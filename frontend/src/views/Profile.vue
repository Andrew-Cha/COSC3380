<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios'

const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)

const periods = ['lastDay', 'lastWeek', 'lastMonth', 'lastYear'];
const selectedPeriod = ref(periods[0]);
const totalFines = ref(0);
const pastLoansData = ref(0);

const apiUrl = `http://${import.meta.env.VITE_SERVER_URL}:3000/api`;

const fetchFinesReport = async () => {
  try {
    const response = await axios.get(`${apiUrl}/reports/fines`, {
      params: {
        period: selectedPeriod.value,
      },
    });
    totalFines.value = response.data.total_fines;
  } catch (error) {
    console.error('Error fetching fines report:', error);
  }
};

const fetchPastLoans = async () => {
  try {
    const response = await axios.get(`${apiUrl}/reports/pastLoans`, {
      params: {
        period: selectedPeriod.value,
      },
    });
    pastLoansData.value = response.data;
  } catch (error) {
    console.error('Error fetching pastLoans report:', error);
  }
};

onMounted(() => {
  if (user.value.role_id === 3) {
    fetchFinesReport();
    fetchPastLoans();
  }
});
</script>


<template>
  <div class="user-profile-page">
    <div class="user-information">
      <h2 class="page-title">Your Information</h2>
      <div class="user-detail">
        <strong>First Name:</strong>
        <p>{{ user.first_name }}</p>
      </div>
      <div class="user-detail">
        <strong>Last Name:</strong>
        <p>{{ user.last_name }}</p>
      </div>
      <div class="user-detail">
        <strong>Registration Date:</strong>
        <p>{{ user.registration_date }}</p>
      </div>
      <div class="user-detail">
        <strong>Role:</strong>
        <p v-if="user.role_id === 1">Customer</p>
        <p v-else-if="user.role_id === 2">Faculty</p>
        <p v-else-if="user.role_id === 3">Admin</p>
        <p v-else-if="user.role_id === 4">Publisher</p>
      </div>
      <div class="user-detail">
        <strong>Max Allowed Items:</strong>
        <p v-if="user.role_id === 1">Books: 1, Media: 1, Devices: 1</p>
        <p v-else-if="user.role_id === 2">Books: 3, Media: 1, Devices: 1</p>
        <p v-else-if="user.role_id === 3">Books: 5, Media: 5, Devices: 5</p>
        <p v-else-if="user.role_id === 4">Books: 0, Media: 0, Devices: 0</p>
      </div>
      
      <h2 v-if="user.role_id === 3">Admin Section</h2>
      <!-- Fines Report Section -->
      <div v-if="user.role_id === 3" class="report-section">
        <div class="user-detail">
          <strong>Select Period for Fines:</strong>
          <select v-model="selectedFinesPeriod" @change="fetchFinesReport">
            <option v-for="period in periods" :key="period" :value="period">{{ period }}</option>
          </select>
        </div>
        <div class="user-detail">
          <strong>Total Fines Collected:</strong>
          <p>{{ totalFines }}</p>
        </div>
      </div>

      <!-- Past Loans Report Section -->
      <div v-if="user.role_id === 3" class="report-section">
        <div class="user-detail">
          <strong>Select Period for Past Loans:</strong>
          <select v-model="selectedPastLoansPeriod" @change="fetchPastLoansReport">
            <option v-for="period in periods" :key="period" :value="period">{{ period }}</option>
          </select>
        </div>
        <div class="user-detail">
          <strong>Past Loans Information:</strong>
          <div v-for="loan in pastLoansData" :key="loan.id">
            <p>{{ loan.customer_name }} loaned {{ loan.item_type }} '{{ loan.item_name }}' and returned on {{ loan.date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile-page {
  text-align: center;
  margin: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.user-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.user-detail {
  margin: 10px 0;
  text-align: left;
}

.user-detail strong {
  font-weight: bold;
  margin-right: 5px;
  color: #007BFF;
}

.user-detail p {
  margin: 0;
}

.report-section {
  margin-top: 20px;
}

.report-section select {
  padding: 8px;
  font-size: 14px;
  margin-left: 10px;
}

.report-section p {
  font-weight: bold;
  color: #007BFF;
}
</style>
  
