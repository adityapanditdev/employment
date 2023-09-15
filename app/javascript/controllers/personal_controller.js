import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 'email', 'firstName', 'lastName', 'nickname', 'phoneNumber', 'street', 'city', 'state', 'zip', 'firstNameError', 'lastNameError', 'phoneError', 'emailError', 'list', 'listTemplate', 'personalList', 'checkData']
  connect(){
    this.fetchData()
  }

  validateData(event){
    // const emailValue = event.target.value;
    let name = event.target.name
    let submit = document.getElementById('check_data')
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if ( name == 'email'){
      if (!emailPattern.test(event.target.value)){
        this.emailErrorTarget.textContent = 'Email is not currect'
        submit.setAttribute('disabled', true)
      }else{
        this.emailErrorTarget.textContent = ''
        submit.removeAttribute('disabled')
      }
    }else if (name == 'first_name' ){
      if ((event.target.value).length == 25){
        this.firstNameErrorTarget.textContent = "First name should be less then 25 character"
        submit.setAttribute('disabled', true)
      }else{
        this.firstNameErrorTarget.textContent = ''
        submit.removeAttribute('disabled')

      }
    }else if (name == 'last_name'){
      if ((event.target.value).length == 50){
        this.lastNameErrorTarget.textContent = "Last name should be less then 50 character"
        submit.setAttribute('disabled', true)
      }else{
        this.lastNameErrorTarget.textContent = ''
        submit.removeAttribute('disabled')
      }
    }else if (name == 'phone'){
      if (this.phoneNumberTarget.value.length < 11){
        submit.setAttribute('disabled', true)
      }else {submit.removeAttribute('disabled')  }
    }
  }

  phoneNumber(event){
    const regexPattern = /[^0-9-]/g
    event.target.value = event.target.value.replace(regexPattern, "");
    if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward'){
      
    }else if ((event.target.value).length == 3){
      let v = event.target.value + '-'
      this.phoneNumberTarget.value = v
    }
    else if ((event.target.value).length == 7){
      let v = event.target.value + '-'
      this.phoneNumberTarget.value = v
    }
  }

  formData(){
    const email = this.emailTarget.value
    const firstName = this.firstNameTarget.value
    const lastName = this.lastNameTarget.value
    const nickname = this.nicknameTarget.value
    const phoneNumber = this.phoneNumberTarget.value
    const street = this.streetTarget.value
    const city = this.cityTarget.value
    const state = this.stateTarget.value
    const zip = this.zipTarget.value
    return {email: email, personal_info: {firstName: firstName, lastName: lastName, nickname: nickname, phoneNumber: phoneNumber}, address: {street: street, city: city, state: state, zip: zip}}
  }

  checkRequireField(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let valid = true
    if (emailPattern.test(this.firstNameTarget.value)){
      this.emailErrorTarget.textContent = 'Email is require'
      valid = false
    }else{ this.emailErrorTarget.textContent = '' }
    if (this.firstNameTarget.value.length <= 0){
      this.firstNameErrorTarget.textContent = 'First name is require'
      valid = false
    }else { this.firstNameErrorTarget.textContent = '' }
    if (this.lastNameTarget.value.length <= 0){
      this.lastNameErrorTarget.textContent = 'Last name is require'
      valid = false
    }else { this.lastNameErrorTarget.textContent = ''}
    if (this.phoneNumberTarget.value.length < 12){
      this.phoneErrorTarget.textContent = 'Phone number is require'
      valid = false
    }else { this.phoneErrorTarget.textContent = ''}
    return valid
  }

  create() {
    if (this.checkRequireField()){
      let data = this.formData();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      };
      fetch("/personals.json", options)
      .then(response => response.json())
      .then(data => {
        let list  =  document.getElementById('personal_list')
        const listItem = document.createElement("li");
        listItem.textContent = data.email
        list.appendChild(listItem);
        this.hidModal()
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  }

  hidModal(){
    let modal = document.getElementById('authentication-modal')
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeAttribute('role')
    document.body.classList.remove('overflow-hidden')
    let arr = document.querySelectorAll('body div')
    arr = arr[arr.length - 1]
    arr.parentNode.removeChild(arr)
  }

  fetchData(){
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };
    fetch("/personals/all.json", options)
    .then(response => response.json())
    .then(data => {
      this.displayData(data)
    })
    .catch(error => {
      console.log('>>>>>>>>>>>>>>>>>>')
    });
  }

  displayData(data){
    const list = this.personalListTarget
    list.innerHTML = ""
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.email
      list.appendChild(listItem);
    })
  }
}
