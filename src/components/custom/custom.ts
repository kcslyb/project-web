import CustomLogo from './custom-logo.vue';
import CustomPerm from './custom-perm.vue';
import CustomDict from './custom-dict.vue';
import CustomInput from './custom-input.vue';
import CustomDrawer from './custom-drawer.vue';
import CustomFileUpload from './custom-file-upload.vue';
import CustomAddressCity from './custom-address-city.vue';
import CustomNode from './node/self-node.vue';
import CustomPaging from './custom-paging.vue';
import CustomCollapse from './custom-collapse.vue';
import CustomUpload from './custom-upload.vue';
import CustomTable from "@/components/custom/custom-table.vue";
import CustomFloatNavigation from "@/components/custom/custom-float-navigation.vue";
import CustomForm from "@/components/custom/custom-form.vue";
import CustomPage from "@/components/custom/custom-page.vue";
import CustomBtnList from "@/components/custom/custom-button-list.vue";

const components: any[] = [
    CustomLogo,
    CustomPerm,
    CustomDict,
    CustomDrawer,
    CustomInput,
    CustomFileUpload,
    CustomAddressCity,
    CustomNode,
    CustomPaging,
    CustomCollapse,
    CustomFloatNavigation,
    CustomTable,
    CustomUpload,
    CustomForm,
    CustomPage,
    CustomBtnList
];

const install = (Vue: any) => {
    components.map((value) => {
        Vue.component(value.name, value);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign(components, {install});
