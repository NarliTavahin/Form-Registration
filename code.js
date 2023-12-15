
const sampleForm = document.getElementById("sample-form");

sampleForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  let form = e.currentTarget;

  let url = form.action;

  try {
   
    let formData = new FormData(form);

    let responseData = await postFormFieldsAsJson({ url, formData });

  
    let { serverDataResponse } = responseData;

    console.log(serverDataResponse);
  } catch (error) {
   
    // console.error(error);
  }
});


async function postFormFieldsAsJson({ url, formData }) {
 
  let formDataObject = Object.fromEntries(formData.entries());

  let formDataJsonString = JSON.stringify(formDataObject);

  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
 
    body: formDataJsonString,
  };


  // let res = await fetch(url, fetchOptions);

 
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }

  return res.json();
}
// ----------------------------------------------------
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = Object.fromEntries(formData);
  const payload = JSON.stringify(res);
  console.log(payload);

  for (item of formData) {
    console.log(item[0], item[1]);
  }

  fetch("https://httpbin.org/post", {
    method: "POST",
    body: payload,
    headers: {
      "content-Type": "application/json",
    },
  })
  
    .then((res) => res.json())
    .then((res) => console.log(res));
});

// -----------------------------------Country List-------------------------------------
var config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}


var countrySelect = document.querySelector('.country'),
  stateSelect = document.querySelector('.state'),
  citySelect = document.querySelector('.city')


function loadCountries() {

  let apiEndPoint = config.cUrl

  fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
  .then(Response => Response.json())
  .then(data => {
      // console.log(data);

      data.forEach(country => {
          const option = document.createElement('option')
          option.value = country.iso2
          option.textContent = country.name 
          countrySelect.appendChild(option)
      })

  })
  .catch(error => console.error('Error loading countries:', error))

  stateSelect.disabled = true
  citySelect.disabled = true
  stateSelect.style.pointerEvents = 'none'
  citySelect.style.pointerEvents = 'none'
}


function loadStates() {
  stateSelect.disabled = false
  citySelect.disabled = true
  stateSelect.style.pointerEvents = 'auto'
  citySelect.style.pointerEvents = 'none'

  const selectedCountryCode = countrySelect.value
   console.log(selectedCountryCode);
  stateSelect.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
  citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

  fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
  .then(response => response.json())
  .then(data => {
       console.log(data);

      data.forEach(state => {
          const option = document.createElement('option')
          option.value = state.iso2
          option.textContent = state.name 
          stateSelect.appendChild(option)
      })
  })
  .catch(error => console.error('Error loading countries:', error))
}


function loadCities() {


    citySelect.disabled = false
    citySelect.style.pointerEvents = 'auto'



  const selectedCountryCode = countrySelect.value
  const selectedStateCode = stateSelect.value
  console.log(selectedCountryCode, selectedStateCode);

  citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options


  fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
  .then(response => response.json())
  .then(data => {
       console.log(data);

      data.forEach(city => {
          const option = document.createElement('option')
          option.value = city.iso2
          option.textContent = city.name 
          citySelect.appendChild(option)
      })
  })
}



window.onload = loadCountries




// -------------------------------upload photo---------------------

var loadFile = function(event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
};

// -------------------------------phone number validation---------------------


const input = document.querySelector("#Country_code");
            const iti = window.intlTelInput(input, {
              nationalMode: false,
              utilsScript: "./build/js/utils.js",
              allowDropdown: true,
            });
          
            // Set the initial dial code to +98
            iti.setNumber("+98");
          
            // Make the input field not clickable (remove the down arrow icon)
            const arrow = document.querySelector(".iti__flag-container > .arrow");
            arrow.style.display = "none";
          
            // Change the flag on click event
            const countryCode = document.querySelector(".iti__selected-dial-code ");
            const countryFlag = document.querySelector(".iti__flag-container > .iti__flag");
            const phoneNumberInput = document.getElementById("phoneNumber");
          
            countryFlag.addEventListener("click", function () {
              const dialCode = countryCode.innerText;
              iti.setCountry(dialCode.trim());
          
              // Add a space after the country code in the input field
              phoneNumberInput.value = phoneNumberInput.value.replace(/^\+\d*/, `+${dialCode} `);
            });



// ---------------------------------------------Validation--------------------------

function formValidation()
{

var fname = document.registration.fname;
var lname = document.registration.lname;
var uadd = document.registration.address;
var uphone = document.registration.phone;
var uemail = document.registration.email;



if(allLetter(fname))
{
if(allLetter(lname))
{
if(allLetter(uadd))
{ 
if(allnumeric(uphone))
{
if(ValidateEmail(uemail))
{
} 
}
}
}
}

return false;

} 


// ----------First Name-----------------



 function allLetter(fname)
{ 
var letters = /^[A-Za-z]+$/;
if(fname.value.match(letters))
{
return true;
}
else
{
alert('Username must have alphabet characters only');
fname.focus();
return false;
}
}
// -----------Last Name----------------
function allLetter(lname)
{ 
var letters = /^[A-Za-z]+$/;
if(lname.value.match(letters))
{
return true;
}
else
{
alert('Username must have alphabet characters only');
lname.focus();
return false;
}
}

// ----------Address-----------------

function allLetter(uadd)
{ 
var letters = /^[0-9a-zA-Z]+$/;
if(uadd.value.match(letters))
{
return true;
}
else
{
alert('User address must have alphanumeric characters only');
uadd.focus();
return false;
}
}


// -----------Telephone----------------

function allnumeric(uphone)
{ 
var numbers = /[0-9]/;
if(uphone.value.match(numbers))
{
return true;
}
else
{
alert('Phone number must have numeric characters only');
uphone.focus();
return false;
}
}

// -----------Email----------------

function ValidateEmail(uemail)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(uemail.value.match(mailformat))
{
return true;
}
else
{
alert("You have entered an invalid email address!");
uemail.focus();
return false;
}
}

