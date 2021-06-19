<template>
  <div>
    <a-result status="success" title="Successfully used halo sdk login!">
      <template #extra>
        {{ environment }}
      </template>
    </a-result>
  </div>
</template>
<script>
import { haloAdminClient } from "@/core/haloSdk";
export default {
  name: "Dashboard",
  data() {
    return {
      environment: {}
    };
  },
  async created() {
    const environment = await haloAdminClient.getEnvironment();
    this.environment = environment.data;
  }
};
</script>
