<template>
  <div>
    <custom-form
      ref="product"
      :inline="false"
      :label-width="80"
      :form-items="formItems"
      form-name="product"
      v-model="productDto"
      @uploadSuccess="uploadSuccess"
      :rules="rules">
    </custom-form>
    <custom-button-list @submit="submit" @cancel="cancel"></custom-button-list>
  </div>
</template>

<script>
  import CustomForm from "../../../../components/custom/custom-form";
  import {productFormItems} from "./product-form-json";
  import CustomButtonList from "../../../../components/custom/custom-button-list";
  import {ApiFactory, Product} from "../../../../resources";

  export default {
    name: "product-form",
    components: {CustomButtonList, CustomForm},
    props: {
      product: {
        type: Object,
        default: () => {
        }
      }
    },
    watch: {
      product: {
        handler(val) {
          this.productDto = val
        },
        deep: true
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
          productType: [
            {required: true, message: '类型不能为空'}
          ],
          productPrise: [
            {required: true, message: '价格不能为空'}
          ],
          productDescription: [
            {required: true, message: '描述不能为空'}
          ]
        }
      }
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        this.formItems = productFormItems;
      },
      uploadSuccess(file) {
        let {fileId, filePath} = file;
        this.productDto.productFileId = fileId;
        this.productDto.productFilePath = filePath;
      },
      submit() {
        this.$refs['product'].$refs['product'].validate(v => {
          if (v) {
            let param = Object.assign({}, this.productDto);
            if (this.productDto.id) {
              this.edit(param);
            } else {
              this.add(param);
            }
          }
        })

      },
      add(param) {
        ApiFactory.getApi(Product).post(param).then(() => {
          this.$notify.success({
            duration: 2000,
            title: '成功',
            message: '添加' + this.productDto.productName + '"成功'
          });
          this.cancel();
        }).catch(() => {
          this.$notify.error({
            duration: 2000,
            title: '失败',
            message: '添加' + this.productDto.productName + '"失败'
          });
        })
      },
      edit(param) {
        ApiFactory.getApi(Product).put(param).then(() => {
          this.$notify.success({
            duration: 2000,
            title: '成功',
            message: '编辑' + this.productDto.productName + '"成功'
          });
          this.cancel();
        }).catch(() => {
          this.$notify.error({
            duration: 2000,
            title: '失败',
            message: '编辑' + this.productDto.productName + '"失败'
          });
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