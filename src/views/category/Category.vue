<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @itemClick="itemClick"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategory="showSubcategory"></tab-content-category>
        </div>
      </scroll>
    </div>
  </div>

  
</template>

<script>
import NavBar from 'components/common/navbar/Navbar'
import TabMenu from './childComps/TabMenu.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabContentCategory from './childComps/TabContentCategory.vue'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category.js'
import TabControl from 'components/content/tabControl/TabControl.vue'


export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Scroll,    
    TabContentCategory,
    TabControl,
  },
  data() {
    return {
      categories: [],
      currentIndex: -1,
      categoryData: {}
    }
  },
  created() {
    // 请求分类数据
    this.pickCategory()
  },
  computed: {
    showSubcategory() {
      if(this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories
    }
  },
  methods: {
		  pickCategory() {
        getCategory().then(res => {
		      // 1.获取分类数据
          this.categories = res.data.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
           this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': [],
              }
            }
          }
          // 3.请求第一个分类的数据
          this.pickSubcategories(0)
        })
      },
      pickSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data.data
          this.categoryData = {...this.categoryData}
          this.pickCategoryDetail('pop')
          this.pickCategoryDetail('new')
          this.pickCategoryDetail('sell')
        })
      },

      pickCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },

      /**
       * 事件响应相关的方法
       */

      itemClick(index) {
        this.pickSubcategories(index)
      },
  }
}
</script>

<style scoped>
#category {
  height: 100vh;
}

#category .nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  z-index: 999;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}

#tab-content {
  height: calc(100% - 50px -49px);
  flex: 1;
  overflow: hidden;
}
</style>