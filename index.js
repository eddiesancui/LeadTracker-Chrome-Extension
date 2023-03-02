let myLeads = []
let oldLeads = []
const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))
const tabBtn = document.querySelector("#tab-btn")

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
} // this is to save the values from input even when site refreshed

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
  })
})

function render(leads) {
  let listItems = "" 
  for (let i = 0; i < leads.length; i++) { 
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `
  }
  ulEl.innerHTML = listItems 
}

deleteBtn.addEventListener("dblclick", (event) => {
  localStorage.clear();
  myLeads = [];
  render(myLeads)
}); // This is to remove the saved input values in the DOM and storage

inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})


// Hints:
// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.clear()
// PS: both key and value need to be strings
