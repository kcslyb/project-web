<template>
  <span class="perm" v-if="isShow">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'CustomPerm',
    props: {
      label: {
        type: String,
        default: ''
      }
    },
    data() {
      return {};
    },
    computed: {
      isShow: function () {
        let permissions = this.$store.getters.permissions ? this.$store.getters.permissions : [];
        return permissions.includes(this.label);
      }
    }
  };
</script>
<style scoped>
  .perm{
  }
</style>
