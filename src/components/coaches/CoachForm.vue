<template>

    <base-container>
        <h3>Register as Coach</h3>
        <form @submit.prevent="registerAsCoach">
        <div class="form-control" :class="{invalid: !firstname.isValid}">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model.trim="firstname.val" @blur="clearValidity('firstname')">
            <p v-if="!firstname.isValid">First Name is invalid</p>
        </div>
        <div class="form-control" :class="{invalid: !lastname.isValid}">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model.trim="lastname.val" @blur="clearValidity('lastname')">
            <p v-if="!lastname.isValid">Laset Name is invalid</p>
        </div>
        <div class="form-control" :class="{invalid: !description.isValid}">
            <label for="description">Description</label>
            <textarea type="text" id="description" v-model.trim="description.val" @blur="clearValidity('description')"/>
            <p v-if="!description.isValid">Description is invalid</p>
        </div>

        <div class="form-control" :class="{invalid: !hourlyRate.isValid}">
            <label for="hourlyRate">Hourly Rate $</label>
            <input type="number" id="hourlyRate" v-model.number="hourlyRate.val" @blur="clearValidity('hourlyRate')"/>
            <p v-if="!hourlyRate.isValid">Rate is invalid</p>
        </div>

        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h4>Area of expretise</h4>
        
            <div class="filter-option">
                <input type="checkbox" checked id="frontend" value="frontend" v-model="areas.val" @blur="clearValidity('areas')"> 
                <label for="frontend">Frontend</label>
            </div>

            <div class="filter-option">
                <input type="checkbox" checked id="backend" value="backend" v-model="areas.val" @blur="clearValidity('areas')">  
                <label for="backend">Backend</label>
            </div>

            <div class="filter-option">
                <input type="checkbox" checked id="career" value="career" v-model="areas.val" @blur="clearValidity('areas')"> 
                <label for="career">Career</label>
            </div>
            <p v-if="!areas.isValid">Chouse you areas!</p>
        </div>
            
        <p v-if="!isFormValid">Could you please fix errors above</p>
        <base-button mode="outline" type="submit">Register</base-button>
    </form>
    </base-container>

</template>

<script>
export default {
    emits:['store-data'],
    data(){
        return {
            firstname:{
                val: '',
                isValid: true
            },
            lastname:{
                val: '',
                isValid: true
            },
            description:{
                val: '',
                isValid: true
            },
            hourlyRate:{
                val: 0,
                isValid: true
            },
            areas:{
                val: [],
                isValid: true
            },
            isFormValid: true
        }
    },
    methods:{
        clearValidity(input){
            this[input].isValid = true;
            this.isFormValid = true;
        },
        checkFormValid(){
            if(this.firstname.val === ''){
                this.firstname.isValid = false;
                this.isFormValid = false;
            }else{
                this.firstname.isValid = true;
            }

            if(this.lastname.val === ''){
                this.lastname.isValid = false;
                this.isFormValid = false;
            }else{
                this.lastname.isValid = true;
            }

            if(this.description.val === ''){
                this.description.isValid = false;
                this.isFormValid = false;
            }else{
                this.description.isValid = false;
            }

            if(this.hourlyRate.val === 0 || this.hourlyRate.val < 0){
                this.hourlyRate.isValid = false;
                this.isFormValid = false;
            }else{
                this.hourlyRate.isValid = false;
            }

            if(this.areas.val && (this.areas.val < 0 || this.areas.val.length === 0)){
                this.areas.isValid = false;
                this.isFormValid = false;
            }else{
                this.areas.isValid = true;
            }

           if(this.areas.isValid === true && this.hourlyRate.isValid === true &&
           this.firstname.isValid === true && this.lastname.isValid === true &&
           this.description.isValid === true){
            this.isFormValid = true;
           }
            return this.isFormValid;
        },
        registerAsCoach(){
            if(!this.checkFormValid()){
                return false;
            }
            const t = new Date();
            const formData = {
                firstname: this.firstname.val,
                lastname: this.lastname.val,
                description: this.description.val,
                hourlyRate: this.hourlyRate.val,
                areas: this.areas.val,
                id: t.getMilliseconds()
            };
            
            this.$emit('store-data', formData);
        }
    }
}
</script>

<style scoped>
    .form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>