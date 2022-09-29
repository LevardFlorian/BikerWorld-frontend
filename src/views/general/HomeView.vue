<template>
    <main class="main">
    <HomePostList></HomePostList>
    <HomeModelList></HomeModelList>
    <HomeSalesList></HomeSalesList>
  </main>
</template>

<script>

import HomePostList from '../../components/posts/HomePostList';
import HomeModelList from '../../components/models/HomeModelList';
import HomeSalesList from '../../components/sales/HomeSalesList';

export default {

  components: {
    HomePostList,
    HomeModelList,
    HomeSalesList,
  }

}
</script>