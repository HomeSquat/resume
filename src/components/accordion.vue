<template>
  <ul class="accordion" :style="{height: height+'px'}">
    <li
      v-for="(accdionItem, index) in accordionList"
      :key="index"
      :style="{background: accdionItem.background,color: accdionItem.color}"
      class="accordion--item"
    >
      <label
        @click="check(index)"
        :style="{height: labelHeight+'px',lineHeight: labelHeight+'px'}"
        class="label"
      >
        <span>{{accdionItem.label}}</span>
        <span :class="{active: currentIndexTemp == index}" class="icon iconfont iconjiantou"></span>
      </label>
      <div :style="{height: accdionItem.contentHeight+'px'}" class="content-box">
        <div :id="'content'+index" :style="{height: contentHeight+'px'}" class="wrapper">
          <div
            v-if="accdionItem.content"
            v-html="accdionItem.content"
            class="content-html content">
          </div>
          <ul
            v-else
            class="content-html content">
            <p>{{ accdionItem.proficiency }}</p>
            <li v-for="(text, textIndex) in accdionItem.list" :key="textIndex" class="content-html-list">
              <div class="index">{{ `${textIndex+1}.` }}</div>
              <div class="text">{{ text }}</div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: '',
  props: {
    height: {
      type: [String, Number],
      required: true,
    },
    labelHeight: {
      type: [String, Number],
      required: true,
    },
    currentIndex: {
      type: [String, Number],
      default: '0',
    },
    list: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    colorList: {
      type: Array,
      default() {
        return [
          {
            background: 'rgba(114, 172, 209,.2)',
            color: '#fff',
          },
        ];
      },
    },
  },
  data() {
    return {
      option: {
        scroll: [],
      },
      accordionList: [],
      contentHeight:
        Number(this.height) - Number(this.labelHeight) * this.list.length,
      currentIndexTemp: this.currentIndex,
    };
  },
  created() {
    this.list.forEach((item, index) => {
      const colorItem = this.colorList[index % this.colorList.length];
      // eslint-disable-next-line
      if (index == this.currentIndex) {
        this.accordionList.push({
          label: item.label,
          content: item.content,
          proficiency: item.proficiency,
          list: item.list,
          contentHeight: this.contentHeight,
          background: colorItem.background,
          color: colorItem.color,
        });
      } else {
        this.accordionList.push({
          label: item.label,
          content: item.content,
          proficiency: item.proficiency,
          list: item.list,
          contentHeight: 0,
          background: colorItem.background,
          color: colorItem.color,
        });
      }
      this.initScroll(index);
    });
    // this.initScroll(0);
  },
  components: {},
  methods: {
    check(index) {
      this.accordionList[this.currentIndexTemp].contentHeight = 0;
      this.accordionList[index].contentHeight = this.contentHeight;
      this.currentIndexTemp = index;
      // this.initScroll(index);
    },
    initScroll(index) {
      this.$nextTick(() => {
        this.option.scroll[index] = new BScroll(`#content${index}`, {
          disableMouse: true,
          // probeType: 3,
          preventDefault: false,
          scrollbar: {
            fade: true,
            interactive: false, // 1.8.0 新增
          },
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300,
          },
        });
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.accordion
  .label
    position relative
    display block
    box-sizing border-box
    width 100%
    padding-left 20px
    font-weight bold
    box-shadow 0 -2px 3px 0px rgba(0, 0, 0, 0.2)
    cursor pointer
    .icon
      position absolute
      top 50%
      right 20px
      transform translateY(-50%) rotate3d(0, 0, 1, -90deg)
      transition all 0.3s
      &.active
        transform translateY(-50%) rotate3d(0, 0, 1, 0deg)
  .content-box
    position relative
    padding 0 40px
    overflow hidden
    transition height 0.3s
    .content-html
      padding 20px 0
      // overflow-y scroll
      .content-html-list
        position relative
        margin-bottom 10px
        .index
          position absolute
          line-height 20px
        .text
          padding-left 20px
          line-height 20px
</style>
