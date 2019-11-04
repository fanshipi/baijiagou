<template>
  <div class="search">
    <div class="content">
      <icon type="search"
            size="18"></icon>
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.search {
  width: 100%;
  height: 100rpx;
  background-color: #f10215;
  box-sizing: border-box;
  .content {
    margin: 0 16rpx;
    height: 76%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    width: 96%;
    font-size: 28rpx;
    background-color: #fff;
    icon {
      color: #bbb;
      margin-right: 16rpx;
    }
  }
}
</style>