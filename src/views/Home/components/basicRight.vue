<template>
  <div class="basic-right">
    <div class="user">
      <div class="user-avatar-box">
        <div class="user-avatar" @click="changeActive">
          <img :src="'./userConfig/'+userInfoBasic.avatar" class="user-avatar__img">
        </div>
        <div v-if="isShowTip" class="tip">
          <span class="icon iconfont iconshouzhi"></span>
          <span>点击头像查看我更多信息</span>
        </div>
      </div>
      <div class="user-name">{{userInfoBasic.name}}</div>
      <div class="user-job">{{userInfoBasic.job}}</div>
      <div class="user-motto">{{userInfoBasic.motto}}</div>
      <div ref="skillRadar" class="skill-radar"></div>
    </div>
    <div class="external-links">
      <a
        v-for="(link,index) in userInfoBasic.links"
        :key="index"
        :href="link.url" target="_blank">
        <span :class="link.icon" class="external-links__item iconfont"></span>
        <!-- 我的虚拟主机对这几个图标有意见 暂时注释 -->
        <!-- <img :src="'./userConfig/links/'+link.img" class="external-links__item"/> -->
      </a>
    </div>
 </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/radar');
require('echarts/lib/component/tooltip');

export default {
  name: 'basicRight',
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
      isShowTip: false,
    };
  },
  created() {
    const isShwoTip = JSON.parse(localStorage.getItem('isShowTip'));
    this.isShowTip = isShwoTip === null ? true : isShwoTip;
  },
  mounted() {
    this.initSkillRadar();
  },
  methods: {
    /**
     * 左侧基本信息页面弹出缩进切换，触发父元素的值改变
     */
    changeActive() {
      if (this.isShowTip) {
        this.isShowTip = false;
        localStorage.setItem('isShowTip', false);
      }
      this.$emit('changeActive');
    },
    /**
     * 初始化技能雷达图
     */
    initSkillRadar() {
      const indicator = [];
      const value = [];
      this.userInfoBasic.skill.radar.forEach((item) => {
        indicator.push({
          name: item.skillName,
          max: 100,
        });
        value.push(item.value);
      });
      const skillRadar = echarts.init(this.$refs.skillRadar, { width: 'auto', height: 'auto' });
      skillRadar.setOption({
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,250,0.2)',
        },
        radar: {
        // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              textShadowColor: '#fff',
              textShadowBlur: 5,
            },
          },
          axisLine: {
            show: false,
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(114, 172, 209, 0.2)',
                'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 5,
            },
          },
          indicator,
        },
        series: [{
          type: 'radar',
          emphasis: {
            areaStyle: {
              color: '#FF6666',
              opacity: 1,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
            },
          },
          // areaStyle: { normal: {} },
          data: [
            {
              name: '技能总览',
              value,
              areaStyle: {
                normal: {
                  opacity: 0.9,
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    {
                      color: '#FF9966',
                      offset: 0.3,
                    },
                    {
                      color: '#FF6666',
                      offset: 1,
                    },
                  ]),
                },
              },
              lineStyle: {
                normal: {
                  type: 'solid',
                },
              },
            },
          ],
        }],
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.basic-right
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  padding 60px 20px
  .user
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    width 100% // 兼容ie
    .user-avatar-box
      position relative
      .user-avatar
        width 120px
        height 120px
        border-radius 120px
        overflow hidden
        cursor pointer
        .user-avatar__img
          width 100%
          height 100%
      .tip
        position absolute
        top 50%
        right -160px
        transform translateY(-50%)
        width 140px
        padding 5px 10px
        border-radius 4px
        background rgba(255,255,255,.2)
        animation shake .3s infinite alternate
        // transition all .3s
        &:after
          content ''
          position absolute
          top 50%
          left -16px
          transform translateY(-50%)
          width 0
          height 0
          border 8px solid transparent
          border-right-color rgba(255,255,255,.2)
        .icon
          margin-right 10px
    .user-name
      margin 20px 0
      font-size 24px
    .user-job
      margin-bottom 20px
      font-size 18px
    .user-motto
      width 100% //兼容ie
      line-height 24px
      font-size 16px
      letter-spacing 4px
  .skill-radar
    width 100%
    height 220px
  .external-links
    margin-top 20px
    text-shadow none
    .external-links__item
      width 20px
      height 20px
      margin 0 10px
      font-size 20px
      color #fff
@keyframs shake
  0%
    transform translate3d(0,-50%,0)
  100%
    transform translate3d(10px,-50%,0)
@-webkit-keyframes shake
  0%
    transform translate3d(0,-50%,0)
  100%
    transform translate3d(10px,-50%,0)
@-moz-keyframes shake
  0%
    transform translate3d(0,-50%,0)
  100%
    transform translate3d(10px,-50%,0)
</style>
