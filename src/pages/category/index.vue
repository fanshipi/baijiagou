<template>
  <div class="category">
    <search />
    <div class="content">
      <div class="left">
        <ul class="left-content">
          <li v-for="(item,index) in categories"
              :key="item.cat_id"
              @click="activeIndex = index"
              :class="{active:activeIndex===index}">{{item.cat_name}}</li>
        </ul>
      </div>
      <div class="right"
           v-if="isInit">
        <img src="../../../static/icon/titleImage.png"
             alt="">
        <ul>
          <li class="category1"
              v-for="(item1,index1) in categories[activeIndex].children"
              :key="item1.cat_id">
            <p class="title">/<span>{{item1.cat_name}}</span>/</p>
            <ul>
              <li class="product_list"
                  v-for="item2 in item1.children"
                  :key="item2.cat_id"
                  @click="toList(item2.cat_name)">
                <img :src="item2.cat_icon"
                     alt="">
                <p>{{item2.cat_name}}</p>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/search'
export default {
  components: {
    search
  },
  data () {
    return {
      activeIndex: 0,
      categories: [],
      isInit: false
    }
  },
  methods: {
    getCategories () {
      this.$request({ url: '/api/public/v1/categories' }).then(res => {
        // console.log(res)
        const { meta: { status }, message } = res.data
        if (status === 200) {
          this.categories = message
          this.isInit = true
        }
      })
    },
    toList (name) {
      wx.navigateTo({
        url: `/pages/list/main?keyword=${name}`
      })
    }
  },
  onLoad () {
    this.getCategories()
  }
}
</script>

<style lang="less" scoped>
.category {
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 32rpx;
  .content {
    display: flex;
    color: #333;
    text-align: center;
    position: absolute;
    top: 100rpx;
    left: 0;
    right: 0;
    bottom: 0;
    .left-content {
      width: 198rpx;
      height: 100%;
      background-color: #f4f4f4;
      overflow: auto;
      li {
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1rpx solid #eee;
        &.active {
          color: #cb4450;
          background-color: #fff;
          position: relative;
          &::before {
            position: absolute;
            content: ".";
            left: 0;
            top: 20rpx;
            bottom: 0;
            background-color: #cb4450;
            width: 8rpx;
            height: 60rpx;
          }
        }
      }
    }
    .right {
      flex: 1;
      overflow: auto;
      text-align: center;
      > img {
        width: 520rpx;
        height: 180rpx;
        margin-top: 20rpx;
        margin-right: 16rpx;
      }
      .category1 {
        .title {
          height: 110rpx;
          line-height: 110rpx;
          color: #c0c0c0;
          span {
            color: #333;
            margin: 0 30rpx;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          .product_list {
            width: 33.333%;
            margin: 20rpx 0;
            img {
              width: 120rpx;
              height: 120rpx;
            }
          }
        }
      }
    }
  }
}
</style>