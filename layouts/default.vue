<template>
  <div
    class="bg-background-secondary text-text-primary min-h-screen transition-colors duration-300 ease-in-out"
  >
    <TheHeader />

    <main class="container bg-background-secondary mx-auto ">
      <slot></slot>
    </main>
    <TheFooter />
  </div>
</template>
