<template>
  <div
    class="bg-background-secondary text-text-primary min-h-screen transition-colors duration-300 ease-in-out"
  >

    <TheHeader />
    <SwiperHero/>
    <BestPartner 
      logoUrl="/images/mainPartner.png" 
      partnerLink="https://stronapartnera.com"
      altText="Nazwa Partnera XYZ"
    />
    <main class="container bg-background-secondary mx-auto px-4 py-8"><slot></slot></main>
    <TheFooter />
  </div>
</template>

