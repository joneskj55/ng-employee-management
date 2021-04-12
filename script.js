const search = document.getElementById("search");

search.addEventListener("submit", (e) => {
  e.preventDefault();
  let subHead = document.getElementById("sub-head");
  subHead.className = "hidden";
  let userNameInput = document.getElementById("user-name");
  let userName = userNameInput.value;
  getRepos(userName);
});

function getRepos(userName) {
  const request = new XMLHttpRequest();
  const queryString = "q=" + encodeURIComponent(userName);
  const url = `https://api.github.com/search/users?${queryString}${userName}`;

  request.open("GET", url, true);

  request.onload = function () {
    const data = JSON.parse(this.response);
    let repos = document.getElementById("repos");
    while (repos.firstChild) {
      repos.removeChild(repos.firstChild);
    }
    if (data.message === "Not Found") {
      let ol = document.getElementById("repos");
      let li = document.createElement("li");
      li.innerHTML = `
                <p><strong>No account exists with username:</strong> ${userName}</p>`;
      ol.appendChild(li);
    } else {
      let ol = document.getElementById("repos");
      let p = document.createElement("p");
      p.innerHTML = `<p class="text-center"><strong>Number of Public Repos:${data.score}</p><br>`;
      ol.appendChild(p);

      for (let i in data) {
        let li = document.createElement("li");

        // Display selected data
        li.innerHTML = `
                <div class="sm:border-t-2 sm:border-b-2 sm:border-r-2 sm:border-l-2 rounded p-4">
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>Stars:</strong> ${data[i].stargazers_count}</p>
                <p><strong>Forks:</strong> ${data[i].forks_count}</p>
                <p><strong>Language:</strong> ${data[i].language}</p>
                <p><strong>URL:</strong> <a class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="${data[i].html_url}" target="_blank">${data[i].html_url}</a></p></div><br>
            `;
        ol.appendChild(li);
      }
    }
  };
  request.send();
}
