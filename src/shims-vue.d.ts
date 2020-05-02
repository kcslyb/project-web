declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/vue' {
  import vue from 'vue';
  interface Vue extends vue{
    $notify: any;
    $https: any;
    $getDict: any;
    $formatDateTime: string;
  }
  export default Vue;
}
