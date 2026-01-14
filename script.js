document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------
  // Store users
  // ----------------------------
  let allUsers = [];

  // ----------------------------
  // Fetch Users
  // ----------------------------
  async function fetchUsers() {
    const loader = document.getElementById("loader");

    try {
      loader.style.display = "block";

      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      allUsers = users;

      loader.style.display = "none";

      displayUsers(allUsers);

    } catch (error) {
      loader.innerText = "Error loading users!";
      console.error(error);
    }
  }

  // ----------------------------
  // Display Users
  // ----------------------------
  function displayUsers(users) {
    const usersContainer = document.getElementById("usersContainer");
    usersContainer.innerHTML = "";

    users.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>City:</strong> ${user.address.city}</p>

        <button class="view-details-btn"
          data-user='${JSON.stringify(user).replace(/'/g, "&#x27;")}'>
          View Details
        </button>
      `;

      usersContainer.appendChild(card);
    });
  }

  // ----------------------------
  // Modal Logic
  // ----------------------------
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const closeModalBtn = document.getElementById("closeModal");

  closeModalBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-details-btn")) {
      const user = JSON.parse(
        e.target.getAttribute("data-user").replace(/&#x27;/g, "'")
      );

      modalContent.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
      `;

      modalOverlay.style.display = "flex";
    }
  });

  // ----------------------------
  // Search Logic

  // Search Logic
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(keyword) ||
    user.username.toLowerCase().includes(keyword) ||
    user.email.toLowerCase().includes(keyword)
  );

  if (filteredUsers.length === 0) {
    // If no users found, show message
    const usersContainer = document.getElementById("usersContainer");
    usersContainer.innerHTML = `<p style="text-align:center; color:red; font-weight:bold; margin-top:20px;">
      User not found!
    </p>`;
  } else {
    displayUsers(filteredUsers);
  }
});

  // ----------------------------
  

  // ----------------------------
  // Start App
  // ----------------------------
  fetchUsers();

});
