<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button
          :is-checked="isSelectAll"
          class="check-button"
        @click.native="checkClick"/>
        <span>全选</span>
      </div>

      <div>
        合计：{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
        去计算：{{checkLength}}
      </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

    export default {
        name: "CartBottomBar",
      components:{
        CheckButton
      },
      computed:{
          ...mapGetters(['cartList']),
        totalPrice() {
          return '￥' + this.cartList.filter(item => {
            return item.checked
          }).reduce((preValue,item) => {
            return preValue+item.price * item.count
          },0).toFixed(2)
        },
        checkLength() {
          return this.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            //当购物车没有数据时加上判断使全选为false
          if (this.cartList.length === 0){
            return false
          }
          //方法一：使用filter
          // return !(this.cartList.filter(item => !item.checked).length)

          //方法二:使用find，这样性能会好一点
         return !this.cartList.find(item => !item.checked)

          //方法三：普通遍历
          //   for(let item of this.cartList){
          //     if (!item.checked){
          //       return false
          //     }
          //   }
          //
          //   return true
        }
      },
      methods:{
        checkClick(){
          if (this.isSelectAll){
            //全部选中
            this.cartList.forEach(item => item.checked = false)
          }else {
            //部分或全部不选中
            this.cartList.forEach(item => item.checked = true)
          }
          //不可以这样简化，item.cheecked会被影响变化
          //this.cartList.forEach(item => item.checked = !this.isSelectAll)

        },
        calcClick(){
          if(!this.isSelectAll){
            this.$toast.show('请选择购买的商品',20000)
          }
        }
      }
    }
</script>

<style scoped>
.bottom-bar{
  line-height: 40px;
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
}
.check-content{
  align-items: center;
  display: flex;
  margin-left: 5px;

}
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;

  }
  .calculate{
    background-color: #a3a3a5;
    text-align: center;
  }

</style>
