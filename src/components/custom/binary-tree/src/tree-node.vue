<template>
  <div>
    <div v-for="(item, index) in treeData" :key="`tree_node_${index}`">
      <node :content="item.label"></node>
    </div>
  </div>
</template>

<script>
  import PermissionTree from "@/utils/permission-tree";
  import Node from "@/components/custom/binary-tree/src/node";

  export default {
    name: "TreeNode",
    components: {Node},
    props: {
      treeData: {
        type: Array,
        default: () => {
          return PermissionTree
        }
      }
    }
  }
</script>

<style scoped>

</style>
