<template>
  <div class="listView">
    <div class="item">
      <houseSaleItem v-if="data.type === '1'" :data="data"></houseSaleItem>
      <houseRentItem v-if="data.type === '2'" :data="data"></houseRentItem>
      <recruitmentItem v-if="data.type === '3'" :data="data"></recruitmentItem>
      <jobItem v-if="data.type === '4'" :data="data"></jobItem>
      <transactionItem v-if="data.type === '5'" :data="data"></transactionItem>
      <secondHandItem v-if="data.type === '6'" :data="data"></secondHandItem>
      <carpoolCenterItem v-if="data.type === '7'"></carpoolCenterItem>
    </div>
  </div>
</template>

<script>
  import houseSaleItem from './houseSaleItem'
  import houseRentItem from './houseRentItem'
  import recruitmentItem from './recruitmentItem'
  import jobItem from './jobItem'
  import transactionItem from './transactionItem'
  import secondHandItem from './secondHandItem'
  import carpoolCenterItem from './carpoolCenterItem'

  export default {
    name: 'List',
    components: {
      houseSaleItem,
      houseRentItem,
      recruitmentItem,
      jobItem,
      transactionItem,
      secondHandItem,
      carpoolCenterItem
    },
    props: {
      data: {
        type: Object
      }
    },
    methods: {

    },

  }
</script>

<style lang="stylus" type="text/stylus">

</style>
