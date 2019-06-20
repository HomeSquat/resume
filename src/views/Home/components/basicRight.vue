<template>
  <div class="basic-right">
    <div class="user" @click="changeActive">
      <div class="user-avatar">
        <img :src="userInfoBasic.avatar" class="user-avatar__img">
      </div>
      <div class="user-name">{{userInfoBasic.name}}</div>
      <div class="user-job">{{userInfoBasic.job}}</div>
      <div class="user-motto">{{userInfoBasic.motto}}</div>
      <div ref="skillRadar" class="skill-radar"></div>
    </div>
    <div class="external-links">
      <a href="https://blog.csdn.net/github_37710255" target="_blank">
        <span class="external-links__item iconfont iconcsdn"></span>
      </a>
      <a href="http://blog.coderdong.cn/blog/" target="_blank">
        <span class="external-links__item iconfont iconblog"></span>
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
      basicActive: false,
    };
  },
  mounted() {
    this.initSkillRadar();
  },
  methods: {
    /**
     * 左侧基本信息页面弹出缩进切换，触发父元素的值改变
     */
    changeActive() {
      this.basicActive = !this.basicActive;
      this.$emit('changeActive', this.basicActive);
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
    align-items center
    width 100% // 兼容ie
    cursor pointer
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
      width 100% //兼容ie
      line-height 24px
      font-size 16px
      letter-spacing 4px
    .skill-radar
      width 100%
      height 220px
      margin-top 100px
  .external-links
    margin-top 20px
    text-shadow none
    .external-links__item
      margin 0 10px
      font-size 30px
      &.iconblog
        font-size 28px
</style>
