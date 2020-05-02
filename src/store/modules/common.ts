const common = {
    state: {
        fileUploadPath: 'http://127.0.0.1:8018/api/file/upload',
        dict: [],
        dictGroup: {}
    },
    mutations: {
        SET_DICT: (state: any, data: any) => {
            if (!state.dict.includes(data)) {
                state.dict.splice(0, 0, data);
            }
        },
        SET_DICT_GROUP: (state: any, data: any) => {
            let length = state.dict.length - 1;
            state.dictGroup[ state.dict[length]] = data;
        }
    },
    actions: {
        initDict({commit}: { commit: any }) {
            commit('SET_DICT', commit);
        }
    }
};

export default common;
