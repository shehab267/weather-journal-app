/*
-------Project Steps------
1. Send order to API ---> get data and take what I need
2. Take valid input from the user 
3. merge both data in newData <--- 'object'
4. POST the object and save it in projectData
5. Update UI
6. Uploud the Data and Change the Cover based on the temperature
*/

/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apikey = "2e7d091e00561b28810fa49acac106e5";
// save Generate Button in variable
const generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
// Add One month as it start from index 0
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// On cilck the following will go
// - Getting Values from the user
// - call openWeatherData to get the data from API
// - send Post Data Request
// - Send GET request for Updating UI
// - Change page's cover and Show the results Smoothly

generate.addEventListener("click", () => {
  // Taking zip code from user
  const zipCode = document.querySelector("#zip").value;
  // Taking feelings code from user
  const content = document.querySelector("#feelings").value;

  // CallBack openWeatherData with a zipCode 'as a paramater'
  openWeatherData(zipCode)
    // Start POST request to get the data from API
    // Get the data and save them in the object
    .then(function (data) {
      addData({
        location: data.name,
        temperature: data.main.temp,
        newDate,
        content,
      });
      // Change background Cover denpend on temperature
      coverChange(data.main.temp);
      // show the results on the page
      active();
    })
    .then(() => {
      // - Send GET request for Updating UI
      updateUI();
    });
});

// generate button on clicked ---> addEventListener to callback generatingData
// Get API data
async function openWeatherData(zipCode) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=imperial`
    );
    // get the data from the API then convert them to json
    const info = await res.json();
    return info;
    // If there are any errors log them in the console
  } catch (err) {
    console.log(err);
  }
}

// POST data
async function addData(obj = {}) {
  const response = await fetch("/add", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // body data type must match "content-type"
    body: JSON.stringify(obj),
  });

  // convert the obj to json
  try {
    const updatedData = await response.json();
    return updatedData;
    // If there are any errors log them in the console
  } catch (err) {
    console.log(err);
  }
}

// GET data project the Update UI
async function updateUI() {
  const req = await fetch("/all");
  try {
    // Converting Data
    const data = await req.json();
    // Prompt Data in html
    document.querySelector("#date").innerHTML = data.newDate;
    document.querySelector("#temp").innerHTML = data.temperature + "&degF";
    document.querySelector("#location").innerHTML = data.location;
    document.querySelector("#content").innerHTML = data.content;

    // If there are any errors log them in the console
  } catch (err) {
    console.log(err);
  }
}

// Show and hide entry
// Get the element then add class active
async function active() {
  let div = document.getElementById("holderEntry");
  if (div.className === "") {
    div.className = "active";
  }
}

// Change the background Cover debend on the weather
async function coverChange(temp) {
  let div = document.getElementById("app");
  if (temp !== "") {
    if (temp < 70) {
      div.style.backgroundImage = "url()";
    } else if (temp > 70) {
      div.style.backgroundImage = "url(hot.jpg)";
    }
  } else {
    return;
  }
}
