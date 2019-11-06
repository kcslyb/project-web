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
        type: String |  [],
        default: ''
      },
      type: {
        type: String,
        default: 'and'
      }
    },
    data() {
      return {};
    },
    computed: {
      isShow: function () {
        let tempType = Object.prototype.toString.call(this.label);
        if (Object.is(tempType, '[object Array]')) {
          if (!this.label.length) {
            return false;
          }
          let flag = 0;
          this.label.forEach(v => {
            if (this.hasPermission(v)) {
              flag++;
            }
          });
          if (this.type && Object.is('or', this.type)) {
            return flag > 0;
          }
          return Object.is(flag, this.label.length);
        }
        return this.hasPermission(this.label);
      }
    },
    methods: {
      hasPermission(perm) {
        let permissions = this.$store.getters.permissions ? this.$store.getters.permissions : [];
        return permissions.includes(perm);
      }
    }
  };
</script>
<style scoped>
  .perm{
  }
</style>
