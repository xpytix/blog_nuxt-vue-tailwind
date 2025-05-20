<template>
  <div
    class="bg-background-secondary text-text-primary min-h-screen transition-colors duration-300 ease-in-out"
  >

    <TheHeader />
    <SwiperHero/>
    <!-- <BestPartner 
      logoUrl="https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
      partnerLink="https://stronapartnera.com"
      altText="Nazwa Partnera XYZ"
    /> -->
    <main class="container bg-background-secondary mx-auto px-4 py-8"><slot></slot></main>
    <TheFooter />
  </div>
</template>

