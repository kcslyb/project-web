<template>
  <el-avatar :src="src" size="medium"></el-avatar>
</template>

<script>
  import {ApiFactory, File} from "../../../resources";

  export default {
    name: "user-avatar",
    props: {
      id: [String]
    },
    data () {
      return {
        src: ''
      }
    },
    watch: {
      id (val, oldVal) {
        if (val !== oldVal) {
          this.initFileData()
        }
      }
    },
    mounted() {
      this.initFileData()
    },
    methods: {
      async initFileData() {
        if (this.id) {
          const temp = this.id.split(',');
          await ApiFactory.getApi(File).accessFileBase64(temp).then((res) => {
            if (res.status === 200) {
              if (Array.isArray(res.data) && res.data.length > 0) {
                this.src = res.data[0].base64
              }
            }
          }).catch(error => {
            throw new Error(error)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
