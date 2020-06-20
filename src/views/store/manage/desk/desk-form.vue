<template>
  <div>
    <custom-form
      ref="desk"
      :inline="false"
      form-name="desk"
      :label-width="80"
      :form-items="formItems"
      v-model="productDto"
      :rules="rules">
    </custom-form>
    <custom-button-list align="right" @submit="submit" @cancel="cancel"></custom-button-list>
  </div>
</template>

<script>
  import DeskListJson from "./desk-form-json";
  import Operation from "../../../../operation/operation";

  export default {
    name: 'desk-form',
    props: {
      operation: {
        type: Operation,
        required: true
      }
    },
    data() {
      return {
        formItems: [],
        productDto: {},
        rules: {
          productName: [
            {required: true, message: '名称不能为空'}
          ],
          deskSerialNumber: [
            {required: true, message: '编码不能为空'}
          ],
          deskStatus: [
            {required: true, message: '状态不能为空'}
          ]
        }
      }
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        this.formItems = DeskListJson.formItems;
      },
      submit() {
        this.$refs['desk'].$refs['desk'].validate(v => {
          if (v) {
            let param = Object.assign({}, this.productDto);
            if (param['deskId']) {
              this.operation.handleSave(param, () => {
                this.cancel();
              });
            } else {
              this.operation.handleUpdate(param, () => {
                this.cancel();
              });
            }
          }
        })

      },
      cancel() {
        this.$emit("close");
      }
    }
  }
</script>

<style scoped>

</style>