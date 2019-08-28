<template>
<div>
    <slot name="title" />

    <div class="row justify-content-center">
      <div :class="column_content">
        
        <div class="card">

          <slot name="legend" />            

          <div class="card-body">
            <form @submit.prevent="''" action="#" method="post">
              <div :class="column">
                <slot name="input" />
              </div>
                <slot name="button" />
            </form>
          </div>
        </div>
      </div>
    </div>
</div>    
</template>

<script>
export default {
    props: {
        legend: {
            type: String,
            // required: true,
            default: 'No Legend',
        },
        column: {
            type: String,
            default: '', // 'row'            
        },
        column_content: {
            type: String,
            default: 'col-12', // 'row'            
        }        
    },    
}
</script>

