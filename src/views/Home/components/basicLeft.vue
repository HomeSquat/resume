<template>
 <div class="basic-left">
  <div class="left">

  </div>
  <div ref="right" class="right">
    <ul ref="userInfo" class="user--info">
      <li v-for="(base,index) in userInfoBasic.base" :key="index" class="user--info__item">
        <span class="label">{{base.baseLabel}}:</span>
        <span class="value">{{base.baseValue}}</span>
      </li>
      <ul class="user--info__expect">
        <li v-for="(expect,index) in userInfoBasic.expect" :key="index" class="expect--item">
            <span class="label">{{expect.expectLabel}}:</span>
            <span class="value">{{expect.expectValue}}</span>
        </li>
      </ul>
    </ul>
    <!-- <baidu-map class="map" style="width:500px;height:700px">
    </baidu-map> -->
    <div ref="container" class="map"></div>
  </div>
 </div>
</template>

<script>
import loadBMap from '../loadMap.js';

export default {
  name: '',
  props: {
    userInfoBasic: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      myMap: null,
    };
  },
  created() {
    this.initMap();
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.userInfo);
      console.log(this.$refs.userInfo.clientHeight);
      console.log(this.$refs.right.clientHeight);
      console.log(this.$refs.right.clientHeight);
      this.$refs.container.style.height = `${this.$refs.right.clientHeight - this.$refs.userInfo.clientHeight - 40}px`;
    });
  },
  components: {

  },
  methods: {
    initMap() {
      /* eslint-disable */
      loadBMap('kU9Tu9jwLbpR1HVwlV0VEPMUm0lfdcZ8')
        .then(() => {
          // 百度地图API功能
          this.myMap = new BMap.Map(this.$refs.container); // 创建Map实例
          this.myMap.centerAndZoom(new BMap.Point(120.541601,30.642723), 13); // 初始化地图,设置中心点坐标和地图级别
          // 添加地图类型控件
          this.myMap.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
            }),
          );
          // this.myMap.setCurrentCity('杭州'); // 设置地图显示的城市 此项是必须设置的
          this.myMap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        })
        .catch((err) => {
          console.log('地图加载失败');
        });
        /* eslint-disable */
    }
  }
};
</script>

<style scoped lang="stylus">
.basic-left
  display flex
  justify-content space-between
  padding 60px 40px
  .left
    width 50%
    border:15px solid;
    border-image url("../../../assets/img/border.png") 20 stretch
  .right
    width 50%
    padding-left 20px
    .user--info
      position relative
      width 100%
      padding 10px
      border:15px solid;
      border-image url("../../../assets/img/border.png") 20 stretch
      .label
          display inline-block
          width 80px
          margin-right 10px
      .user--info__expect
        position absolute
        top 10px
        right 10px
        .expect--item
          line-height 40px
        .label
          width 120px
          color #FF9933
      .user--info__item
        line-height 40px
        .label
          color rgb(2, 179, 225)
    .map
      // height 400px
      margin-top 10px
      border:15px solid;
      border-image url("../../../assets/img/border.png") 20 stretch
</style>
