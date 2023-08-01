const API_URL = "https://api.data.gov.in/resource/7b3ed3e9-841f-4444-ab3c-e760a08b53b3";
const API_KEY = "579b464db66ec23bdd0000017985a71bffbf422571a53b710f09d003"; // Replace with your actual API key
const ITEMS_PER_PAGE = 10; // Display single row data for each page

let currentPage = 1;
let totalRecords = 0;
let allData = [];

/**
 * Fetch dam data from the API based on the current page.
 */
async function fetchDamDetails(page) {
  try {
    const response = await fetch(`${API_URL}?api-key=${API_KEY}&format=json&offset=${(page - 1) * ITEMS_PER_PAGE}`);
    const data = await response.json();
    totalRecords = data.total;
    allData = data.records;
    return data.records;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

/**
 * Create a table row HTML string based on the provided dam record.
 */
function createTableRow(record) {
  return `
    <tr>
      <td>${record.sno}</td>
      <td>${record.name_of_dam}</td>
      <td>${record.district}</td>
    </tr>
  `;
}

/**
 * Render the table with the provided data.
 */
function renderTable(data) {
  const tableBody = document.getElementById("data");
  tableBody.innerHTML = data.map(createTableRow).join("");
}

/**
 * Update the page title and description.
 */
function updatePageInfo() {
  const titleElement = document.getElementById("title");
  const descriptionElement = document.getElementById("description");
  titleElement.textContent = "Dams of Tamil Nadu";
  descriptionElement.textContent = `Displaying dam data from tn-gov API using promise with pagination (Page ${currentPage})`;
}

/**
 * Handle the "Next" button click event.
 */
function onNextButtonClick() {
  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    fetchDamDetails(currentPage)
      .then((data) => {
        renderTable(data);
        updatePageInfo();
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
}

/**
 * Handle the "Previous" button click event.
 */
function onPrevButtonClick() {
  if (currentPage > 1) {
    currentPage--;
    fetchDamDetails(currentPage)
      .then((data) => {
        renderTable(data);
        updatePageInfo();
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
}

// Initial setup
fetchDamDetails(currentPage)
  .then((data) => {
    renderTable(data);
    updatePageInfo();
  })
  .catch((error) => console.error("Error fetching data:", error));

// Add event listeners to the buttons
document.getElementById("prevBtn").addEventListener("click", onPrevButtonClick);
document.getElementById("nextBtn").addEventListener("click", onNextButtonClick);
