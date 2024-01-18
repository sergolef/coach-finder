<template>
    <base-container>
    
    <span class="filter-option">
        <input type="checkbox" checked id="frontend" @change="updateFilter"> 
        <label for="frontend">Frontend</label>
    </span>

    <span class="filter-option">
        <input type="checkbox" checked id="backend" @change="updateFilter"> 
        <label for="backend">Backend</label>
    </span>

    <span class="filter-option">
        <input type="checkbox" checked id="career" @change="updateFilter"> 
        <label for="career">Career</label>
    </span>


    </base-container>
</template>

<script>
    export default {
        data(){
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    emit: ['filter-update'],
    methods:{
        updateFilter(event){
            const filterId = event.target.id;
            const isChecked = event.target.checked;

            const updatedFilters = {
                ...this.filters,
                [filterId]: isChecked
            };

            this.filters = updatedFilters;
            this.$emit('filter-update', updatedFilters);
        }
    }
}
</script>

<style scoped>
    h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>