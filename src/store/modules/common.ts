const common = {
    state: {
        fileUploadPath: 'http://127.0.0.1:8018/api/file/upload',
        dict: {},
    },
    mutations: {
        SET_DICT: (state: any, data: any) => {
            state.dict = Object.assign({}, state.dict, data);
        }
    },
    actions: {
        initDict({commit}: { commit: any }) {
            commit('SET_DICT', commit);
        }
    }
};

export default common;
