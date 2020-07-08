<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" class="tabcontrol-item"
           :class="{active:index === currentIndex}" @click="itemclick(index)">
        <span>{{item}}</span>
      </div>

    </div>
</template>

<script>
    export default {
      name: "TabContriol",
      props:{
          titles:{
            type:Array,
            default(){
              return []
            }
          }
      },
      data() {
        return {
          currentIndex:0
        }
      },
      methods:{
        itemclick(index){
          this.currentIndex = index;
          this.$emit('tabClick',index)
        }
      }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    height: 40px;
    background-color: #fff;
  }
  .tabcontrol-item{
    flex: 1;
  }
  .tabcontrol-item{
    padding: 5px;
  }
  .active{
    color: hotpink;
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);

  }
</style>
