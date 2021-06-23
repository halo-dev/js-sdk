<template>
  <div class="hello">
    aa
  </div>
</template>

<script>
import { AdminApiClient } from "@halo-dev/admin-api";
import { HaloRestAPIClient } from "@halo-dev/rest-api-client";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  created() {
    // auth: {
    //     type: "customizeAuth",
    //     authHeader: "Admin-Authorization",
    //     getToken() {
    //       return "4e47f2a5105b4716a948a60877dfd571";
    //     },
    //   },
    let haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "http://127.0.0.1:8090"
    });
    const client = new AdminApiClient(haloRestApiClient);
    console.log(client);
    client.getEnvironment().then(res => {
      console.log(res);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
