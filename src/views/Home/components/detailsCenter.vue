<template>
  <div class="detail-center">
    <h1 class="title">{{detail.title}}</h1>

    <!-- S 主体内容 -->
    <div class="content">
      <div v-if="detail.self.show" class="content--item self">
        <h2 class="content--item__title">{{detail.self.label}}</h2>
        <p v-html="detail.self.content" class="content--item__des"></p>
      </div>
      <!-- / 自我介绍 -->

      <div v-if="detail.learning.show" class="content--item learning">
        <h2 class="content--item__title">{{detail.learning.label}}</h2>
        <div class="content--item__timeline">
          <div v-for="(timer,index) in detail.learning.content" :key="index" class="timeline--item">
            <div class="timeline--item__text">
              <span class="time">{{timer.time}}</span>
              <span class="leavel">{{timer.leavel}}</span>
              <span>{{timer.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- / 教育经历 -->

      <div v-if="detail.jobs.show" class="content--item jobs">
        <h2 class="content--item__title">{{detail.jobs.label}}</h2>
        <div class="content--item__timeline">
          <div v-for="(job,index) in detail.jobs.content" :key="index" class="timeline--item">
            <div class="timeline--item__text">
              <span class="time">{{job.time}}</span>
              <span class="leavel-job">{{job.leavel}}</span>
              <span>{{job.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- / 工作经历 -->

      <div v-if="detail.project.show" class="content--item project">
        <h2 class="content--item__title">{{detail.project.label}}</h2>
        <div class="content--item__project">
          <div v-for="(project,index) in detail.project.content" :key="index" class="project--item">
            <div class="project--item__row">
              <span class="label">项目名称：</span>
              <span>{{project.name}}</span>
            </div>
            <div class="project--item__row">
              <span class="label">项目演示地址：</span>
              <a :href="project.demo" target="_blank" class="link">{{project.demo}}</a>
            </div>
            <div class="project--item__row">
              <span class="label">项目时间：</span>
              <span>{{project.time}}</span>
            </div>
            <div class="project--item__row">
              <div class="label">工作内容：</div>
              <div v-html="project.work" class="value"></div>
            </div>
            <div class="project--item__row">
              <div class="label">项目总结：</div>
              <div v-html="project.summary" class="value"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- E 主体内容 -->

  </div>
</template>

<script>
export default {
  name: 'detailCenter',
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      scrollList: [],
    };
  },
  components: {

  },
  mounted() {
    const el = this.$el;
    Object.keys(this.detail).forEach((item) => {
      if (item !== 'title') {
        const top = el.getElementsByClassName(item)[0].offsetTop;
        this.scrollList.push({
          id: item,
          icon: this.detail[item].icon,
          label: this.detail[item].label,
          top,
        });
      }
    });
    this.$emit('load', this.scrollList);
  },
};
</script>

<style scoped lang="stylus">
.detail-center
  padding 40px 0
  .title
    margin-bottom 40px
    letter-spacing 10px
    text-align center
  .content--item
    margin-top 60px
    color #ccc
    .content--item__title
      color rgb(57, 179, 215)
    .content--item__des
      text-indent 40px
      line-height 24px
      letter-spacing 2px
      font-size 18px
    .content--item__timeline
      padding-left 50px
      .timeline--item
        position relative
        height 80px
        padding-left 40px
        padding-top 56px
        border-left 4px solid #ccc
        &:first-child
          &:before
            content ''
            position absolute
            left -12px
            top 0
            width 20px
            height 20px
            border-top-left-radius 8px
            border-bottom-right-radius 8px
            background #ccc
            transform rotate(-45deg)
        &:after
          content ''
          position absolute
          left 4px
          bottom 4px
          width 20px
          height 20px
          border-top-left-radius 50%
          border-top-right-radius 50%
          border-bottom-right-radius 50%
          background #ccc
          transform rotate(45deg)
        .timeline--item__text
          .time
            width 140px
          .leavel-job
            width 140px
          .time,.leavel,.leavel-job
            display inline-block
            margin-right 40px
    .content--item__project
      padding-left 40px
      .project--item
        margin-bottom 20px
        padding 20px
        border-radius 10px
        border 1px dashed #ccc
        background rgba(63,63,63,.5)
        .project--item__row
          margin-bottom 20px
          .label
            display inline-block
            width 120px
            color rgb(57, 179, 215)
          .value
            padding 10px 40px 10px 120px
            line-height 30px
          .link
            color rgb(240, 173, 78)

</style>
