<template>
  <div class="echarts">
    <div class="top">
      <div>
        <div class="svg svg1">
          <svg-icon class="sss" style="color: #40c9c6" name="duoren"></svg-icon>
        </div>
        <div>
          <p>New Visits</p>
          <span>102,400</span>
        </div>
      </div>

      <div>
        <div class="svg svg2">
          <svg-icon class="sss" style="color: #36a3f7" name="xiaoxi"></svg-icon>
        </div>
        <div>
          <p>Messages</p>
          <span>81,212</span>
        </div>
      </div>
      <div>
        <div class="svg svg3">
          <svg-icon class="sss" style="color: #f4516c" name="qian"></svg-icon>
        </div>
        <div>
          <p>Purchases</p>
          <span>9,280</span>
        </div>
      </div>
      <div>
        <div class="svg svg4">
          <svg-icon class="sss" style="color: #34bfa3" name="gouwuche"></svg-icon>
        </div>
        <div>
          <p>Shoppings</p>
          <span>13,600</span>
        </div>
      </div>
    </div>

    <!-- 折线图 -->
    <ZheXian />
    <div class="bottom">
      <div class="a">
        <!-- 雷达图 -->
        <LeiDa />
      </div>
      <div class="a">
        <!-- 饼状图 -->
        <BingZhuang />
      </div>
      <div class="a">
        <!-- 柱状图 -->
        <ZhuZhuang />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ZheXian from './components/ZheXian.vue'
import LeiDa from './components/LeiDa.vue'
import BingZhuang from './components/BingZhuang.vue'
import ZhuZhuang from './components/ZhuZhuang.vue'
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  background-color: #edeff2;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    > div {
      width: 20%;
      height: 100%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 20px 10px;
      box-sizing: border-box;

      .svg {
        width: 80px;
        height: 80px;
        font-size: 50px;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }
      .svg1:hover {
        background-color: #40c9c6;
        .sss {
          color: #fff !important;
        }
      }
      .svg2:hover {
        background-color: #36a3f7;
        .sss {
          color: #fff !important;
        }
      }
      .svg3:hover {
        background-color: #f4516c;
        .sss {
          color: #fff !important;
        }
      }
      .svg4:hover {
        background-color: #34bfa3;
        .sss {
          color: #fff !important;
        }
      }

      p {
        font-size: 18px;
        color: #8c8c8c;
        margin-bottom: 10px;
      }
      span {
        font-size: 18px;
        color: #666666;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 300px;
    margin: 20px 0 70px 0;
    display: flex;
    justify-content: space-between;
    .a {
      width: 30%;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
