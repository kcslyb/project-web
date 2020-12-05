<template>
    <div style="margin: 0; padding: 0; background-color: #e6e6e6;">
        <div style="width: 100%; height: 100%; text-align: center">
            <div style="width: 100%; padding: 20px;  box-sizing: border-box">
                <div class="title-container">
                    <span class="title-label">视频链接</span>
                    <el-input
                      size="small"
                      type="text"
                      id="basic-url"
                      v-model="baseUrl"
                      @focus="choose()"
                      aria-describedby="basic-addon3"/>
                    <div class="opt-btn">
                        <el-button size="small" @click="play()" id="play-btn" type="success" plain>播放</el-button>
                        <el-button size="small" @click="reset()" id="reset-btn" type="info" plain>重置</el-button>
                        <el-button size="small" @click="change()" id="change-btn" type="primary" plain>切换</el-button>
                    </div>
                </div>
            </div>
            <div style="position: relative; z-index:100; padding: 0 10%; border: 1px solid #e6e6e6">
                <iframe id="iframe-container" src="" width="100%" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import {ApiFactory, Dict} from "../../resources";

    export default {
        data() {
            return {
                count: 0,
                index: 0,
                baseUrl: 'https://v.qq.com/x/page/z00339rhkk0.html',
                currentPath: '',
                parsingList: []
            }
        },
        mounted() {
            document.getElementById("iframe-container").height = window.innerHeight - 100;
            this.initData()
        },
        methods: {
            initData(){
                ApiFactory.getApi(Dict).queryDictByGroupLabel('resolution').then(res => {
                    this.parsingList = []
                    const temp = [].concat(res.data)
                    temp.forEach(value => {
                        if (value.deleteFlag !== '1') {
                            this.parsingList.push(value.remarks || '')
                        }
                    })
                    this.play()
                })
            },
            play() {
                console.info(this.parsingList[this.index])
                document.getElementById("iframe-container").src = this.parsingList[this.index] + this.baseUrl;
            },
            change() {
                this.count += 1;
                this.index = this.count >= this.parsingList.length ? this.count % this.parsingList.length : this.count;
                this.play()
            },
            reset() {
                this.count = 0;
                this.play();
            },
            choose() {
                document.getElementById("basic-url").select();
            }
        }
    }
</script>

<style scoped lang="scss">
    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-label {
            width: 15%;
            padding: 0 20px;
            text-align: right;
        }
        .opt-btn {
            width: 30%;
            padding: 0 20px;
            text-align: left;
        }
    }
</style>

