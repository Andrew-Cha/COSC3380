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

const pastLoansData = ref([]);
const selectedStartDate = ref(null);
const selectedEndDate = ref(null);

const selectedCustomerId = ref(null);
const includeBooks = ref(false);
const includeMedia = ref(false);
const includeDevices = ref(false);
const currentLoansData = ref([]);

const apiUrl = `http://${import.meta.env.VITE_SERVER_URL}:3000/api/fines`;

const fetchFinesReport = async () => {
  try {
    const response = await axios.get(`${apiUrl}/reports/fines`, {
      params: {
        period: selectedPeriod.value,
      },
    });
    totalFines.value = response.data;
    totalFines.value = totalFines.value[0].total_fines
  } catch (error) {
    console.error('Error fetching fines report:', error);
  }
};

const fetchPastLoansReport = async () => {
  try {
    const response = await axios.get(`${apiUrl}/reports/pastLoans`, {
      params: {
        startDate: selectedStartDate.value,
        endDate: selectedEndDate.value,
      },
    });
    pastLoansData.value = response.data;
  } catch (error) {
    console.error('Error fetching pastLoans report:', error);
  }
};


const fetchCurrentLoansReport = async () => {
  try {
    if (includeBooks.value) {
      const booksResponse = await axios.get(`${apiUrl}/reports/currentbooks/${selectedCustomerId.value}`);
      currentLoansData.value = currentLoansData.value.concat(booksResponse.data);
    }

    if (includeMedia.value) {
      const mediaResponse = await axios.get(`${apiUrl}/reports/currentmedia/${selectedCustomerId.value}`);
      currentLoansData.value = currentLoansData.value.concat(mediaResponse.data);
    }

    if (includeDevices.value) {
      const devicesResponse = await axios.get(`${apiUrl}/reports/currentdevices/${selectedCustomerId.value}`);
      currentLoansData.value = currentLoansData.value.concat(devicesResponse.data);
    }
  } catch (error) {
    console.error('Error fetching current loans report:', error);
  }
};

onMounted(() => {
  if (user.value.role_id === 3) {
    fetchFinesReport();
    fetchPastLoansReport();
    fetchCurrentLoansReport();
  }
});


const currentTab = ref('Book');


const condition_book = ref("")
const isbn = ref("")
const book_title = ref("")
const year_book = ref("")
const edition = ref("")
const genre = ref("")

const media_title = ref("")
const file_link = ref("")
const file_type = ref("")
const author = ref("")
const file_size = ref("")

const device_type = ref("")
const device_name = ref("")
const manufacturer = ref("")
const year_publish = ref("")
const serial_number = ref("")
const operating_system = ref("")
const maintenance_history = ref("")


const changeTab = (tab) => {
  currentTab.value = tab;
}

async function addItem() {
  const book = {
    userId: user.value.id,
    condition_book: condition_book.value,
    isbn: isbn.value,
    book_title: book_title.value,
    year_book: year_book.value,
    edition: edition.value,
    genre: genre.value
  }
  const media = {
    userId: user.value.id,
    media_title: media_title.value,
    file_link: file_link.value,
    file_type: file_type.value,
    author: author.value,
    file_size: file_size.value
  }

  const device = {
    userId: user.value.id,
    device_type: device_type.value,
    device_name: device_name.value,
    manufacturer: manufacturer.value,
    year_publish: year_publish.value,
    serial_number: serial_number.value,
    operating_system: operating_system.value,
    maintenance_history: maintenance_history.value
  }

  try {
    if (currentTab.value === 'Book') {
      await axios.post(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/items/createBook`, book);
    } else if (currentTab.value === 'Media') {
      await axios.post(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/items/createMedia`, media);
    } else if (currentTab.value === 'Device') {
      await axios.post(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/items/createDevice`, device);
    }
    window.alert('Item added successfully');
  } catch (error) {
    window.alert('Error adding item. Please try again.');
  }
}
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
    </div>


    <h2 v-if="user.role_id === 3">Admin Section</h2>
    <h3 v-if="user.role_id === 3">Fines Report</h3>

    <div v-if="user.role_id === 3" class="user-information report-section">
      <div class="user-detail">
        <strong>Select Period for Fines:</strong>
        <select @change="fetchFinesReport">
          <option v-for="period in periods" :key="period" :value="period">{{ period }}</option>
        </select>
      </div>
      <div class="user-detail">
        <strong>Total Fines Collected:</strong>
        <p> ${{ totalFines }}</p>
      </div>
    </div>

    <h3 v-if="user.role_id === 3">Loans Report</h3>
    <div v-if="user.role_id === 3" class="user-information report-section">
      <div class="user-detail">
        <strong>Select Period for Past Loans:</strong>
        <div>
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="selectedStartDate">
        </div>
        <div>
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="selectedEndDate">
        </div>
        <button @click="fetchPastLoansReport">Run</button>
      </div>
      <div class="user-detail">
        <strong>Past Loans Information:</strong>
        <div v-for="loan in pastLoansData" :key="loan.id">
          <p>{{ loan.customer_name }} loaned {{ loan.item_type }} '{{ loan.item_name }}' and returned on {{
            loan.returned_at }}
          </p>
        </div>
      </div>
    </div>

    <h3 v-if="user.role_id === 3">Current Loans Report</h3>
    <div v-if="user.role_id === 3" class="user-information report-section">
      <div class="user-detail">
        <strong>Select Customer for Current Loans:</strong>
        <input type="text" v-model="selectedCustomerId" placeholder="Enter Customer ID" />
      </div>
      <div class="user-detail">
        <strong>Include in Report:</strong>
        <label>
          <input type="checkbox" v-model="includeBooks" /> Books
        </label>
        <label>
          <input type="checkbox" v-model="includeMedia" /> Media
        </label>
        <label>
          <input type="checkbox" v-model="includeDevices" /> Devices
        </label>
      </div>
      <button @click="fetchCurrentLoansReport">Run</button>
    </div>

    <div v-if="user.role_id === 3">
      <div v-if="includeBooks">
        <h3>Books</h3>
        <template v-if="currentLoansData.length !== 0">
          <table class="currentLoans-table">
            <th>Title</th>
            <th>ISBN</th>
            <th>Edition</th>
            <th>Loan Date</th>
            <th>Loan Until</th>
            <th>Returned Date</th>
            <tr v-for="book in currentLoansData" :key="book.id">
              <td>{{ book.title }}</td>
              <td>{{ book.isbn }}</td>
              <td>{{ book.edition }}</td>
              <td>{{ book.loaned_at }}</td>
              <td>{{ book.loaned_until }}</td>
            </tr>
          </table>
        </template>
        <p v-else>This user has no books.</p>
      </div>

      <div v-if="includeMedia">
        <h3>Media</h3>
        <template v-if="currentLoansData.length !== 0">
          <table class="currentLoans-table">
            <th>Title</th>
            <th>Author</th>
            <th>Media Link</th>
            <th>Loan Date</th>
            <th>Loan Until</th>
            <th>Returned Date</th>
            <tr v-for="media in currentLoansData" :key="media.id">
              <td>{{ media.title }}</td>
              <td>{{ media.author }}</td>
              <td>{{ media.file_link }}</td>
              <td>{{ media.loaned_at }}</td>
              <td>{{ media.loaned_until }}</td>
            </tr>
          </table>
        </template>
        <p v-else>This user has no media.</p>
      </div>

      <div v-if="includeDevices">
        <h3>Devices</h3>
        <template v-if="currentLoansData.length !== 0">
          <table class="currentLoans-table">
            <th>Name</th>
            <th>Type</th>
            <th>Serial Number</th>
            <th>Loan Date</th>
            <th>Loan Until</th>
            <th>Returned Date</th>
            <tr v-for="device in currentLoansData" :key="device.id">
              <td>{{ device.device_name }}</td>
              <td>{{ device.device_type }}</td>
              <td>{{ device.serial_number }}</td>
              <td>{{ device.loaned_at }}</td>
              <td>{{ device.loaned_until }}</td>
            </tr>
          </table>
        </template>
        <p v-else>This user has no devices.</p>
      </div>
    </div>

    <h2 v-if="user.role_id === 4">Publisher Section</h2>
    <div v-if="user.role_id === 4" class="user-information additem-page">
      <div class="tab-navigation">
        <button @click="changeTab('Book')">Book</button>
        <button @click="changeTab('Media')">Media</button>
        <button @click="changeTab('Device')">Device</button>
      </div>

      <form v-if="currentTab === 'Book'" class="tab-content">
        <label>Condition:</label>
        <input type="text" required v-model="condition_book" />

        <label>ISBN:</label>
        <input type="text" required v-model="isbn" />

        <label>Title:</label>
        <input type="text" required v-model="book_title" />

        <label>Year:</label>
        <input type="text" required v-model="year_book" />

        <label>Edition:</label>
        <input type="text" required v-model="edition" />

        <label>Genre:</label>
        <input type="text" required v-model="genre" />
      </form>

      <form v-if="currentTab === 'Media'" class="tab-content">
        <label>Title:</label>
        <input type="text" required v-model="media_title" />

        <label>File Link:</label>
        <input type="text" required v-model="file_link" />

        <label>File Type:</label>
        <input type="text" required v-model="file_type" />

        <label>Author:</label>
        <input type="text" required v-model="author" />

        <label>File Size:</label>
        <input type="text" required v-model="file_size" />
      </form>

      <form v-if="currentTab === 'Device'" class="tab-content">
        <label>Device Type:</label>
        <input type="text" required v-model="device_type" />

        <label>Device Name:</label>
        <input type="text" required v-model="device_name" />

        <label>Manufacturer:</label>
        <input type="text" required v-model="manufacturer" />

        <label>Year Publish:</label>
        <input type="date" required v-model="year_publish" />

        <label>Serial Number:</label>
        <input type="text" required v-model="serial_number" />

        <label>Operating System:</label>
        <input type="text" required v-model="operating_system" />

        <label>Maintenance History:</label>
        <input type="text" required v-model="maintenance_history" />
      </form>

      <button @click="addItem">Add</button>
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

.additem-page {
  text-align: center;
  margin: 20px;
  background-color: white;
  border-radius: 5px;
  border: solid
}

.tab-navigation {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tab-navigation button {
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.tab-navigation button:hover {
  background-color: #0056b3;
}

.tab-content {
  display: flex;
  flex-direction: column;
}

.tab-content form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

.tab-content label {
  margin-top: 10px;
  text-align: left;
}

.tab-content input,
.tab-content select {
  padding: 8px;
  font-size: 14px;
  margin-top: 5px;
}

.tab-content button {
  margin-top: 20px;
  padding: 12px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.tab-content button:hover {
  background-color: #0056b3;
}
</style>
  
