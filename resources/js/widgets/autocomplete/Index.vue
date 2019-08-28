<template>
    <div>
        <div class="form-group">
            <label class="form-label">{{ title }}</label>
            <cool-select
                @select="selectedItem"
                @focus="onFocus"
                @blur="onBlur"
                v-model="propsSelected"
                :items="propsItems"
                item-value="search"
                item-text="search"
            >
                <template slot="item" slot-scope="{ item: result }">
                    <div style="display: flex; align-items: center;">
                        <div>
                            <slot name="item" :result="result">
                            </slot>
                        </div>
                    </div>
                </template>

                <template slot="selection" slot-scope="{ item: result }">
                    <div :style="styleInput">
                        <slot name="selection" :result="result">
                        </slot>
                    </div>
                </template>
            </cool-select>
        </div>
    </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";

export default {
  name: "autocomplete",
  props: {
      title: "",
      selected: "",
      items: {
          default: [],
      }
  },
  components: {
    CoolSelect,
  },
  data: () => ({
    propsSelected: "",
    propsItems: [],
    styleInput: {
        width: '100%'
    }
  }),
  watch: {
      items: function(val){
          if(val.length > 0 ) {
              this.propsItems = val
              this.propsSelected = this.selected
          }
      }
  },
  methods: {
    selectedItem(item) {
        this.$emit('onSelectedItem', item)
    },	
    onFocus(){
    },
    onBlur(){
    }
  },
  mounted() {
    
    this.propsItems = this.items
    this.propsSelected = this.selected

  }
};
</script>

<style>
.country-flag {
  max-width: 30px;
  margin-right: 10px;
  border: 1px solid #eaecf0;
}
/* Page styles (no need) */
#app {
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  height: 100vh;
}
#app > div {
  width: 450px;
  height: 100%;
}
</style>
