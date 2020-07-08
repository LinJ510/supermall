<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
     <scroll class="content" ref="scroll"
             :probe-type="3"
             @scroll="contentScroll">
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info ref="params" :param-info="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"/>
       <goods-list ref="recommend" :goods="recommends"/>
     </scroll>
      <BackTop @click.native="backClick" v-show="isShowBackTop"/>
      <detail-bottom-bar @addCart="addTCart"/>
<!--      <toast :message="message" :show="show"/>-->
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import GoodsList from "../../components/content/goods/GoodsList";
  // import Toast from "../../components/common/toast/Toast";


  import Scroll from "../../components/common/scroll/Scroll";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "../../common/utils";

  import {backTopMixin} from "../../common/mixin"
  import {mapActions} from 'vuex'

  export default {
        name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        // Toast
      },
    mixins:[backTopMixin],
      data(){
        return {
          id:null,
        topImages: [],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[],
          themeTopYs:[],
          getThemeTopY:null,
          currentIndex:0,
          // message:'',
          // show:false
        }
      },
      created() {
        //保存iid
        this.iid = this.$route.params.iid
        //根据iid保存请求数据
        getDetail(this.iid).then(res => {
          console.log(res);
          const data = res.result;
          //保存数据，获取顶部的图片轮播数据
          this.topImages = res.result.itemInfo.topImages

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          //3.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)

          //4.保存商品的详情数据
          this.detailInfo = data.detailInfo;

          //5获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

          //6.取出评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }

          //7.请求推荐数据
          getRecommend().then(res => {
            // console.log(res);
            this.recommends = res.data.list
          })

          // this.$nextTick(() => {
          //   this.themeTopYs = []
          //
          //   this.themeTopYs.push(0);
          //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          //
          //   console.log(this.themeTopYs);
          // })

          //给getthemeTopY赋值,进行防抖
          this.getThemeTopY = debounce(() => {

            this.themeTopYs = []

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
            this.themeTopYs.push(Number.MAX_VALUE);

            //console.log(this.themeTopYs);
          },100)
        })
      },
    methods:{
          ...mapActions(['addCart']),
          imageLoad(){
            this.$refs.scroll.refresh()
            this.getThemeTopY()

          },
      titleClick(index){
        //console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        //获取y值
        const positionY = -position.y

        //positionY和主题的值对比
        //就是在数组getThemeTopY的值之前，getThemeTopY【0】到getThemeTopY【1】之间就是商品
        //假设数组的数值【0，1132，2201，4401，Number.MAX_VALUE】
        //所以就是在0到1132之间是商品，后面类推
        let length =this.themeTopYs.length
        for(let i = 0;i <length;i++){
          //加上number.MAX_VALUE的值的判断
          if(this.currentIndex != i && (i<length-1 && positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
            this.currentIndex =i
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
          //没有加上number.MAX_VALUE的值的判断
          // if(this.currentIndex != i &&(i<length-1 && positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1]
          //   || (i === length-1 && positionY >= this.themeTopYs[i]))){
          //   this.currentIndex =i
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
        }
        // 是否回到顶部
        this.isShowBackTop = -position.y > 1000
      },
      addTCart(){
        //1、获取购物车需要展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //将商品添加到购物车
        //调用mutations中的方法用commit
        // this.$store.commit('addCart',product)

        //调用action中的方法用dispath
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })

        //将addTCart通过mapAction映射到当前对象中
        this.addCart(product).then(res =>{
          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // },1500)
          console.log(this.$toast);
          this.$toast.show(res,20000)
        })
      }

    }
  }
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
  .content{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
