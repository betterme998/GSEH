<template>
  <div ref="scroll" class="wrapper">
    <ul>
      <button @click="btnClick">南牛</button>
      <li>展示列表1</li>
      <li>展示列表2</li>
      <li>展示列表3</li>
      <li>展示列表4</li>
      <li>展示列表5</li>
      <li>展示列表6</li>
      <li>展示列表7</li>
      <li>展示列表8</li>
      <li>展示列表9</li>
      <li>展示列表10</li>
      <li>展示列表11</li>
      <li>展示列表12</li>
      <li>展示列表13</li>
      <li>展示列表14</li>
      <li>展示列表15</li>
      <li>展示列表16</li>
      <li>展示列表17</li>
      <li>展示列表18</li>
      <li>展示列表19</li>
      <li>展示列表20</li>
      <li>展示列表21</li>
      <li>展示列表22</li>
      <li>展示列表23</li>
      <li>展示列表24</li>
      <li>展示列表25</li>
      <li>展示列表26</li>
      <li>展示列表27</li>
      <li>展示列表28</li>
      <li>展示列表29</li>
      <li>展示列表30</li>
      <li>展示列表31</li>
      <li>展示列表32</li>
      <li>展示列表33</li>
      <li>展示列表34</li>
      <li>展示列表35</li>
      <li>展示列表36</li>
      <li>展示列表37</li>
      <li>展示列表38</li>
      <li>展示列表39</li>
      <li>展示列表40</li>
      <li>展示列表41</li>
      <li>展示列表42</li>
      <li>展示列表43</li>
      <li>展示列表44</li>
      <li>展示列表45</li>
      <li>展示列表46</li>
      <li>展示列表47</li>
      <li>展示列表48</li>
      <li>展示列表49</li>
      <li>展示列表50</li>
      <li>展示列表51</li>
      <li>展示列表52</li>
      <li>展示列表53</li>
      <li>展示列表54</li>
      <li>展示列表55</li>
      <li>展示列表56</li>
      <li>展示列表57</li>
      <li>展示列表58</li>
      <li>展示列表59</li>
      <li>展示列表60</li>
      <li>展示列表61</li>
      <li>展示列表62</li>
      <li>展示列表63</li>
      <li>展示列表64</li>
      <li>展示列表65</li>
      <li>展示列表66</li>
      <li>展示列表67</li>
      <li>展示列表68</li>
      <li>展示列表69</li>
      <li>展示列表70</li>
      <li>展示列表71</li>
      <li>展示列表72</li>
      <li>展示列表73</li>
      <li>展示列表74</li>
      <li>展示列表75</li>
      <li>展示列表76</li>
      <li>展示列表77</li>
      <li>展示列表78</li>
      <li>展示列表79</li>
      <li>展示列表80</li>
      <li>展示列表81</li>
      <li>展示列表82</li>
      <li>展示列表83</li>
      <li>展示列表84</li>
      <li>展示列表85</li>
      <li>展示列表86</li>
      <li>展示列表87</li>
      <li>展示列表88</li>
      <li>展示列表89</li>
      <li>展示列表90</li>
      <li>展示列表91</li>
      <li>展示列表92</li>
      <li>展示列表93</li>
      <li>展示列表94</li>
      <li>展示列表95</li>
      <li>展示列表96</li>
      <li>展示列表97</li>
      <li>展示列表98</li>
      <li>展示列表99</li>
      <li>展示列表100</li>
    </ul>
  </div>
</template>

<script>
// 我们对这个东西做一个封装，因为第三方的东西万一不更新了，万一有buge，所以要包装
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
export default {
  name:'category',
  data() {
    return {
      bscroll:null
    }
  },
  // 等·挂载后它就行了， 忘了看官网
  mounted() {
    this.initBscroll()
  },
  methods: {
    initBscroll(){
      this.bscroll = new BScroll(this.$refs.scroll, {
          pullUpLoad: true,
          probeType:3,
          click:true
      })
      // 监听滚动
      // this.bscroll.on('scroll', (position)=>{
      //   console.log(position);
      // })
      // 监听上拉加载 ,这只执行一次.所以等数据加载好渲染完成后执行this.bscroll.finishPullUp();让上拉加载再次执行
      this.bscroll.on('pullingUp', ()=>{
        console.log('上拉加载');
        setTimeout(() => {
        this.bscroll.finishPullUp();
      },2000)
      })
    },
    pullingUpHandler() {
      console.log('啦啦啦啦');
    },
    btnClick(){
      console.log(5);
    }
  }
}
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;
    overflow: hidden;
  }
</style>