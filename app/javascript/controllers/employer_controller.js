import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['name', 'startDate', 'endDate', 'nameError', 'startError', 'endError', 'employerList']

  connect(){
    this.fetchData()
  }
  validateForm(){
    let valid = true
    if (this.nameTarget.value.length <= 0){
      this.nameErrorTarget.textContent = 'Name is require'
      valid = false
    }else{ this.nameErrorTarget.textContent = '' }
    if(this.startDateTarget.value.length <= 0){
      this.startErrorTarget.textContent = 'Start Date is require'
    }else {this.startErrorTarget.textContent = ''}
    if(this.endDateTarget.value.length <= 0){
      this.endErrorTarget.textContent = 'End Date is require'
    }else{this.endErrorTarget.textContent = ''}
    return valid
  }

  formData(){
    const name = this.nameTarget.value
    const startDate = this.startDateTarget.value
    const endDate = this.endDateTarget.value
    return {name: name, start_date: startDate, end_date: endDate}
  }

  create(){
    if(this.validateForm()){
      let data = this.formData()

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      };
      fetch("/employers.json", options)
      .then(response => response.json())
      .then(data => {
        let list  =  document.getElementById('employer_list')
        console.log(">>>>>>>>>>>>>>>>>.", data)
        const listItem = document.createElement("li");
        listItem.textContent = data.name
        list.appendChild(listItem);
        this.hidModal()
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  }


  hidModal(){
    let modal = document.getElementById('employment-modal')
    console.log(modal)
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeAttribute('role')
    document.body.classList.remove('overflow-hidden')
    let arr = document.querySelectorAll('body div')
    arr = arr[arr.length - 1]
    arr.classList.add('hidden');
  }

  fetchData(){
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };
    fetch("/employers.json", options)
    .then(response => response.json())
    .then(data => {
      this.displayData(data)
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  displayData(data){
    console.log(data)
    const list = document.getElementById('employer_list')
    list.innerHTML = ""
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.name
      list.appendChild(listItem);
    })
  }
}