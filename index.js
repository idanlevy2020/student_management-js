const main = document.querySelector("main");
let tbody = document.querySelector("tbody");
const modal=document.querySelector(".modal");
let users = []; //state

console.log('modal',modal);

function getUsers() {
   fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
         console.log("data fron server", data);
         render(data);
      })
      .catch((err) => {
         console.log(`Fetch problem: ${err.message}`);
         main.innerHTML =
            "<h3 style='color:red'>Error data failed to load</h3>";
      });
}

getUsers();

function render(data) {
   tbody.innerHTML = "";
   const datafromlocalStorage = localStorage.getItem("listStudents");
   // console.log("datafromlocalStorage:", datafromlocalStorage);
   if (datafromlocalStorage) {
      const list = JSON.parse(datafromlocalStorage); // ok
      users = list;
   } else {
      //if no data from localStorage
      users = data;
      localStorage.setItem("listStudents", JSON.stringify(users)); //Update Local Storage
   }

   users.forEach(function (user, i) {
      const tr = document.createElement("tr");
      let temp = `<td class="id">${user.id}</td>`;
      temp += `<td class="name">${user.name}</td>`;
      temp += `<td class="email">${user.email}</td>`;
      temp += `<td class="street">${user.address.street}</td></tr>`;
      temp += `<td class="city">${user.address.city}</td></tr>`;
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "deleteBtn";
      deleteBtn.innerHTML = "X";
      deleteBtn.addEventListener("click", function () {
         users.splice(i, 1);
         /****delete from localStorage ******/
         localStorage.setItem("listStudents", JSON.stringify(users)); //Update Local Storage
         render(users);
      });

      const editBtn = document.createElement("button");
      editBtn.className = "editeBtn";
      editBtn.innerHTML = "edit";
      editBtn.addEventListener("click", function () {
         openModal(user, i);
      });

      tr.innerHTML = temp;
      tr.appendChild(deleteBtn);
      tr.appendChild(editBtn);
      tbody.appendChild(tr);
   });
}

function openModal(user,i) {
   console.log("open modal in user",user);
   modal.style.display="block";
}
