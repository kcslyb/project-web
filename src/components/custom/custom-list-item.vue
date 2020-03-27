<template>
  <div>
    <ul class="custom-ul">
      <template v-for="item of data">
        <li :class="Object.values(item).includes(currentId)?'active':''" @click.prevent="changeDict(item)">
          <div class="hover-show" v-if="Object.values(item).includes(currentId)">
            <custom-perm :label="perm">
              <a href="#" class="pull-right mg-r10" @click.prevent="updateDict(item)">
                <i class="el-icon-edit-outline"></i>
              </a>
              <a href="#" class="pull-right" @click.prevent="removeDict(item)">
                <i class="el-icon-delete"></i>
              </a>
            </custom-perm>
          </div>
          <div class="custom-li-label">
            {{describe}}{{item[label]}}
          </div>
          <div class="custom-li-title">
            {{item[title]}}
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({})
    export default class ListItem extends Vue {
        public name: string = 'ListItem';

        @Prop({default: () => []})
        public data!: any[];

        @Prop({default: () => []})
        public perm!: string[];

        @Prop({default: ''})
        public title!: string;

        @Prop({default: ''})
        public describe!: string;

        @Prop({default: ''})
        public label!: string;

        @Prop({default: ''})
        public currentId!: string;

        changeDict(item: any) {
            this.$emit('change-click', item);
        }

        public updateDict(item: any) {
            this.$emit('update-click', item);
        }

        public removeDict(item: any) {
            this.$emit('remove-click', item);
        }
    };
</script>

<style scoped lang="scss">
  @import "../../assets/scss/common";

  .hover-show {
    z-index: 10;
    float: right;
    display: inline-block;
    a {
      color: $default-border-color;
      background-color: $active-background-color
    }
    a:hover {
      color: $purple-color;
      background-color: $active-background-color
    }
  }
</style>
