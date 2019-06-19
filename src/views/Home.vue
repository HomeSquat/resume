<template>
  <div class="home">

    <!-- S 详细信息 -->
    <div class="details">
      详细信息
    </div>
    <!-- E 详细信息 -->

    <!-- S 基本信息 -->
    <div class="basic"
      :class="{active: option.basicActive}">
      <div class="basic--left">
        左侧
      </div>
      <div class="basic--right">
        <div class="user" @click="changeActive">
          <div class="user-avatar"><img src="../assets/img/user/8.png" class="user-avatar__img"></div>
          <div class="user-name">洞洞杰</div>
          <div class="user-job">前端工程师</div>
          <div class="user-motto">如非软弱,怎会连触手可及的幸福也要放弃?--纵力量绵薄,也要筑起通往梦想的桥梁！</div>
          <div ref="skillRadar" class="skill-radar"></div>
        </div>
        <div class="external-links">
          <a href="https://blog.csdn.net/github_37710255" target="_blank">
            <span class="external-links__item iconfont iconcsdn"></span>
          </a>
          <a href="http://blog.coderdong.cn/blog/" target="_blank">
            <span class="external-links__item iconfont iconblog"></span>
          </a>
          <!-- <img src="../assets/public/" class="external-links__item"></img> -->
        </div>
      </div>
    </div>
    <!-- E 基本信息 -->
  </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/radar');
require('echarts/lib/component/tooltip');

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      option: {
        basicActive: false,
      },
    };
  },
  created() {
  },
  mounted() {
    this.initSkillRadar();
  },
  methods: {
    /**
     * 左侧基本信息页面弹出缩进切换
     */
    changeActive() {
      this.option.basicActive = !this.option.basicActive;
    },

    /**
     * 初始化技能雷达图
     */
    initSkillRadar() {
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
          indicator: [
            { name: 'HTML', max: 100 },
            { name: 'CSS/CSS3', max: 100 },
            { name: 'JavaScript', max: 100 },
            { name: 'Vue', max: 100 },
            { name: 'Git', max: 100 },
            { name: '其他', max: 100 },
          ],
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
              value: [80, 90, 60, 80, 60, 50],
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

<style lang="stylus" scoped>
.home
  position relative
  height 100%
  .details
    width 100%
    height 100%
    padding-left 20%
    background rgb(63, 63, 63)
  .basic
    display flex
    justify-content space-between
    position absolute
    top 0
    left 0
    transform translate3d(-80%,0,0)
    z-index 9
    width 100%
    height 100%
    padding-left 5%
    background rgb(22, 28, 35)
    color #fff
    text-shadow 0 0 5px #fff
    box-shadow 1px 0 8px 0 rgba(0,0,0,.2)
    transition all .3s
    &:hover
      box-shadow 2px 0 15px 0 rgba(0,0,0,.2)
    &.active
      transform translate3d(-5%,0,0)
    .basic--right
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      width 21%
      padding 60px 20px
      cursor pointer
      .user
        display flex
        flex-direction column
        align-items center
        .user-avatar
          width 120px
          height 120px
          border-radius 120px
          overflow hidden
          .user-avatar__img
            width 100%
            height 100%
        .user-name
          margin 20px 0
          font-size 24px
        .user-job
          margin 20px 0
          font-size 18px
        .user-motto
          line-height 24px
          font-size 16px
          letter-spacing 4px
        .skill-radar
          width 100%
          height 220px
          margin-top 100px
      .external-links
        text-shadow none
        .external-links__item
          margin 0 10px
          font-size 30px
          &.iconcsdn
            color rgb(204, 0, 1)
          &.iconblog
            font-size 28px
</style>
