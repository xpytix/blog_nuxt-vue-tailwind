<template>
  <div>
    <Head>
      <Title>Mój Blog</Title>
      <Meta name="description" content="Przeglądaj najnowsze artykuły na moim blogu." />
    </Head>

    <ArticleList
      :articles-data="articles || []"
      :pending="isLoading"
      :error="fetchError"
      :ads-every-nth="2"
    />

  </div>
</template>

<script setup lang="ts">

const { data: articles, pending: isLoading, error: fetchError } = await useAsyncData(
  'home-page-articles',
  () => {
    return queryCollection('blog')
    .order('date', 'DESC')
    .limit(25)
      .all();
  }
);



</script>

<style scoped>
</style>