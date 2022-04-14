<template>
   <div>
      <h3>Your to-do items for today</h3>
      <div v-for="list of todolists" :key="list.id">
         <h3>{{ list.title }}</h3>
         <ul>
            <li v-for="listitem of list.items" :key="listitem.id">
               {{ listitem.Title }}
            </li>
         </ul>
      </div>
  </div>
</template>

<script>
import { useMutation, useQuery, useResult } from "@vue/apollo-composable"
import { GET_LISTS } from "../graphql/queries"

export default {
  data: function() {
      return {
         todolists: [],
         loading: false
      }
   },
   async created() {
      this.loading = true;

      try {
        //const listQuery = useQuery(GET_LISTS, {})
        const { result, loading, error } = useQuery(GET_LISTS, {})
        this.todolists = useResult(result, [], (data) => data?.Lists)
        //console.log("query result: "+listQuery.result)
        console.log("lists: "+JSON.stringify(result))
        console.log("error: "+JSON.stringify(error))
        console.log("todolists: "+JSON.stringify(this.todolists))
      }
      catch (e) {
         console.log("error fetching data: "+e.message)
         //EventBus.$emit(Constants.EVENT_ERROR, "There was a problem fetching items. " + e.message);
      }
      //this.loading = false;
   },
   methods: {
   }
}
</script>
