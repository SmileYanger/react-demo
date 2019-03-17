<template>
  <div>
    <list :lists="lists"></list>
  </div>
</template>

<script>
  import List from '../components/list'

  export default {
    name: "",
    components: {
      List
    },
    data () {
      return {
        lists: [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '4'}]
      }
    }
  }
</script>

<style scoped>

</style>
