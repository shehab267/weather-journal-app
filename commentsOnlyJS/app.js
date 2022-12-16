/*
-------Steps------
1. Send order to API ---> get data and take what I need
2. Take valid input from the user 
3. merge both data in newData <--- 'object'
4. POST the object and save it in projectData
5. Update UI


/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apikey = "2e7d091e00561b28810fa49acac106e5";
const generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
// using toDateString Method from MDN
//Refrence to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString
let newDate = d.toDateString();

/*
------ generatingData func.-------------
- Getting input Values
- call weatherData 
- 


*/
const generatingData = () => {
  // having value from user
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  // CallBack weatherData with a zipCode 'as a paramater'
  weatherData(zipCode).then(function (data) {
    const temp = data.main.temp;
    const city = data.main.city;

    // My finall obj for UI
    const obj = {
      newDate,
      temp,
      city,
      content,
    };

    // Call POST
    postData("/addData", obj);
  });
};

// Get API data
const weatherData = async function (zipCode) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=imperial`
    );
    // get the data from the API then convert them to json
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// POST data
const postData = async function (url = "", obj = {}) {
  const res = await fetch(url, {
    method: "POST",
    // credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // body data type must match "content-type"
    body: JSON.stringify(obj),
  });

  // convert the obj to json
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log(err);
  }
};

// GET data project the Update UI
const updateUI = async () => {
  const res = await fetch("allData");
  try {
    const savingData = await res.json();
    // Prompt Data in html
    document.querySelector("#date").innerHTML = savingData.newDate;
    document.querySelector("#temp").innerHTML = savingData.temp + "&degF";
    document.querySelector("#city").innerHTML = savingData.city;
    document.querySelector("#content").innerHTML = savingData.content;
  } catch (err) {
    console.log(err);
  }
};
