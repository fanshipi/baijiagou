<template>
  <div class="wrapper">
    <Search @confirm="toList"
            :query="keyword" />
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear"
              size="18"
              @click="clear"></icon>
      </div>
      <ul>
        <li v-for="(item,index) in keywords"
            :key="item"
            @click="search(item,index)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from '@/components/search.vue'
export default {
  components: {
    Search
  },
  data () {
    return {
      keywords: wx.getStorageSync('keywords') || [],
      keyword: ''
    }
  },
  onShow () {
    this.keywords = wx.getStorageSync('keywords') || []
    this.keyword = ''
  },
  methods: {
    clear () {
      wx.showModal({
        title: '提示',
        content: '确定要删除所有历史搜索吗？',
        success: res => {
          if (res.confirm) {
            wx.removeStorageSync('keywords')
            this.keywords = []
            // console.log(this.keywords)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    toList (data) {
      // console.log(data)
      this.keyword = data
      let _keywords = [...this.keywords]
      let newKeyword = _keywords.filter(v => {
        return v !== data
      })
      newKeyword.unshift(data)
      wx.setStorageSync('keywords', newKeyword)
      wx.navigateTo({ url: '/pages/list/main?keyword=' + data })
    },
    search (item, index) {
      let _keywords = [...this.keywords]
      _keywords.splice(index, 1)
      _keywords.unshift(item)
      wx.setStorageSync('keywords', _keywords)
      wx.navigateTo({
        url: `/pages/list/main?keyword=${item}`
      })
    }
  }
}
</script>

<style lang="less">
.search {
  background-color: #eee;
  padding: 30rpx 15rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  position: relative;
  icon {
    position: absolute;
    top: 50rpx;
    left: 38rpx;
  }
  input {
    height: 60rpx;
    flex: 1;
    background-color: #fff;
    padding-left: 70rpx;
    box-sizing: border-box;
    border-radius: 4rpx;
  }
  button {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: 1rpx solid #bfbfbf;
    background-color: #eee;
    margin-left: 20rpx;
  }
}

.history-search {
  color: #333;
  font-size: 28rpx;
  padding: 30rpx 30rpx 30rpx 15rpx;
  .title {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
    li {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 26rpx;
      background-color: #ddd;
      margin: 0 30rpx 16rpx 0;
    }
  }
}
</style>