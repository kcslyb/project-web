import CustomLogo from './self-logo.vue';
import CustomPerm from './self-perm.vue';
import CustomDict from './self-dict.vue';
import CustomInput from './self-input.vue';
import CustomDrawer from './self-drawer.vue';
import CustomFileUpload from './self-fileupload.vue';
import CustomAddressCity from './self-address-city.vue';

const components: any[] = [
    CustomLogo,
    CustomPerm,
    CustomDict,
    CustomDrawer,
    CustomInput,
    CustomFileUpload,
    CustomAddressCity,
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
