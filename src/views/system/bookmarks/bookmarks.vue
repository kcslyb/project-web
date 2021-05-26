<template>
  <div class="bookmarks-container" @scroll="handleScroll">
    <div class="bookmarks-btn">
      <el-button class="btn" type="text" size="small" @click="handleUpload">上传书签</el-button>
      <el-button v-if="!$store.getters.userName" class="btn" type="text" size="small" @click="handleLogin">登录</el-button>
      <el-button v-if="$store.getters.userName" class="btn" type="text" size="small" @click="handleExport">导出书签</el-button>
    </div>
    <div id="container-content" class="container-content">
      <div class="bookmarks">
        <div class="bookmarks-content" v-for="(bookmarks, bookIndex) in data" :key="`bookmarks-content-${bookIndex}`">
          <div class="content-item" v-for="(item, index) in bookmarks" :key="`bookmarks-${index}`">
            <img class="content-item-img" :src="item.iconFileId" alt=""/>
            <span class="content-item-jump" @click="handleClick(item)">{{item.title}}</span>
            <i v-if="optFlag(item)" class="el-icon-edit opt-btn" @click="handleEdit(item)"></i>
            <i v-if="optFlag(item)" class="el-icon-delete opt-btn" @click="handleDelete(item)"></i>
          </div>
        </div>
      </div>
    </div>
    <div style="z-index: 100;position: fixed; bottom: 20px; right: 20px" v-show="showScrollTop">
      <div style="display: flex; flex-direction: column">
        <i @click="scrollTop" class="el-icon-s-home btn-item"></i>
        <i @click="scrollMore" class="el-icon-s-home btn-item transform"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomPage from "../../../components/custom/custom-page";
  import {CustomUtils, DateUtils} from "../../../utils/common-utils";
  import {ApiFactory, Bookmarks} from "@/resources";
  export default {
    name: "Bookmarks",
    components: {CustomPage},
    data() {
      return {
        data: [],
        bookmarks: [],
        total: 0,
        condition: {
          start: 0,
          size: 21
        },
        showScrollTop: true,
        bookmarksApi: {}
      }
    },
    mounted() {
      this.bookmarksApi = ApiFactory.getApi(Bookmarks)
      this.initData()
    },
    methods: {
      initData() {
        this.bookmarksApi.query(this.condition).then(res => {
          this.bookmarks = res.data.list
          this.data = CustomUtils.assembleArray(res.data?.list || [])
          console.info(res.data)
          this.total = res.data.total
        })
      },
      handleLogin () {
        this.$router.push("/login").catch((e) => {console.error(e)})
      },
      handleClick (item) {
        this.bookmarksApi.click(item.id).then(res => {
          console.info(res)
          window.open(item.href)
        })
      },
      handleDelete (item) {
        this.$confirm(`确认删除${item.title}?`, {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.bookmarksApi.delete(item.id).then(() => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.initData()
          })
        }).catch(() => {})
      },
      handleEdit (item) {
      },
      handleExport () {
        const tempDate = +new Date()
        const content = this.bookmarks.reduce((acc, cur) => {
          acc += `<DT><A href="${cur.href}" ADD_DATE="${tempDate}" ICON="${cur.iconFileId}">${cur.title}</A>\n`
          return acc
        }, '')
        const docMeta = '<!DOCTYPE>' +
          '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
          '<TITLE>Bookmarks</TITLE>\n' +
          '<H1>Bookmarks</H1>\n' +
          '<DL><p>\n' +
          content +
          '<DL><p>'
        const dateTime = DateUtils.formatStringToDateTime(new Date().toString())
        CustomUtils.saveDataToLocal(docMeta, `书签_${dateTime}.html`).then(() => {
          this.$notify.success({
            title: '成功',
            message: '导出成功'
          })
        })
      },
      handleUpload() {
        CustomUtils.readJsonFromLocal().then(res => {
          this.data = CustomUtils.parseHtml(res).map(value => {
            return CustomUtils.parseHtmlLabel(value.toString())
          })
          this.data.map(value => {
            value.href = value.HREF
            value.iconFileId = value.ICON
            delete value.HREF
            delete value.ICON
            return value
          })
          ApiFactory.getApi(Bookmarks).insertBatch(this.data).then(() => {
            this.initData()
          })
        })
      },
      handleScroll(event) {
        let last = +new Date();
        const now = +new Date();
        if (last && now < last + 100) {
          if (this.deferTimer) {
            clearTimeout(this.deferTimer);
          }
          this.deferTimer = setTimeout(() => {
            last = now;
            if (event.target.scrollTop >= 20) {
              this.showScrollTop = true
            } else {
              this.showScrollTop = false
            }
          }, 500);
        }
      },
      optFlag (item) {
        return item.createBy === this.$store.getters.userId && item.commonFlag !== '1'
      },
      scrollTop () {
        location.href = "#container-content";
      },
      scrollMore () {
        const temp = this.condition.size + 20
        this.condition.size = temp > this.total ? this.total : temp
        this.initData()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common";

  .bookmarks-container {
    text-align: center;
    height: 100%;
    overflow: auto;

    .btn-item {
      font-size: 26px;
      cursor: pointer;
      padding-bottom: 10px;
    }

    .transform {
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); 	/* IE 9 */
      -moz-transform:rotate(180deg); 	/* Firefox */
      -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
      -o-transform:rotate(180deg);
    }

    .bookmarks-btn {
      position: fixed;
      top: 0;
      width: 100%;
      text-align: right;
      padding: 10px 10px;
      box-sizing: border-box;
      background-color: $active-background-color;

      .btn {
        font-size: 14px;
        font-weight: bold;
        color: $default-background-color;
      }
    }

    .container-content {
      width: 60%;
      padding-top: 54px;
      text-align: center;
      display: inline-block;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      .bookmarks {
        text-align: left;
        width: 100%;
        display: flex;
        padding: 5px 0;
        justify-content: space-around;
        flex-wrap: wrap;

        .bookmarks-content {
          width: 46%;
          padding: 0 10px;
          text-align: left;
          display: inline-block;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

          .content-item {
            padding: 10px 8px;
            border-bottom: 1px solid $system-border-color;
            display: flex;
            justify-content: left;
            align-items: center;

            .content-item-img {
              width: 20px;
              height: 20px;
              display: inline-block;
            }

            .content-item-jump {
              cursor: pointer;
              display: inline-block;
              padding: 0 10px;
              text-decoration: none;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              color: $black-color;

              &:hover {
                color: $default-border-color;
              }
            }

            .opt-btn {
              padding-left: 10px;

              &:hover {
                color: $default-border-color;
              }
            }
          }
        }
      }
    }
  }
</style>
