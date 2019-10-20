import Cookies from 'js-cookie';

const common = {
    state: {
        fileUploadPath: 'http://127.0.0.1:8018/api/file/upload',
        bodyHeight: 0,
        windowSize: {width: 1000, height: 500},
        visitedViews: [],
        dictGroup: {},
        searchDto: {},
        logger: {
            logRequestDescribe: '',
            logRequestPageName: ''
        }
    },
    mutations: {
        SET_LOGGER: (state: any, date: any) => {
            state.logger = Object.assign({}, state.logger, date);
        },
        SET_FILE_UPLOAD_PATH: (state: any, date: any) => {
            state.fileUploadPath = date;
        },
        SET_SEARCH_DTO: (state: any, date: any) => {
            state.searchDto = date;
        },
        SET_DICT_GROUP: (state: any, date: any) => {
            state.dictGroup = date;
        },
        SET_BODY_HEIGHT: (state: any, data: any) => {
            state.bodyHeight = data.height;
            state.windowSize = data.window;
        },
        TOGGLE_SIDEBAR: (state: any) => {
            if (state.sidebar.opened) {
                // @ts-ignore
                Cookies.set('sidebarStatus', 1);
            } else {
                // @ts-ignore
                Cookies.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        },
        ADD_VISITED_VIEWS: (state: any, view: any) => {
            if (state.visitedViews.some((v: any) => v.path === view.path)) {
                return;
            }
            state.visitedViews.push({name: view.name, path: view.path});
        },
        DEL_VISITED_VIEWS: (state: any, view: any) => {
            let index;
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === view.path) {
                    index = i;
                    break;
                }
            }
            state.visitedViews.splice(index, 1);
        }
    },
    actions: {
        ToggleSideBar({commit}: { commit: any }) {
            commit('TOGGLE_SIDEBAR');
        },
        addVisitedViews({commit}: { commit: any }, view: any) {
            commit('ADD_VISITED_VIEWS', view);
        },
        delVisitedViews({commit, state}: { commit: any, state: any }, view: any) {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view);
                resolve([...state.visitedViews]);
            });
        }
    }
};

export default common;
