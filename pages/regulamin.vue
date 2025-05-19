// pages/regulamin.vue
<template>
  <div class="container mx-auto px-4 py-8 lg:py-12">
    <article class="prose dark:prose-invert lg:prose-xl mx-auto bg-background-secondary p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
      <header class="mb-8">
        <h1 class="!text-3xl sm:!text-4xl font-heading text-text-primary !mb-3 !leading-tight">
          Regulamin Serwisu Moodzik.pl
        </h1>
        <p class="text-sm text-text-secondary">
          Obowiązuje od: {{ formatDate(effectiveDate) }}
        </p>
      </header>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">§ 1 Postanowienia Ogólne</h2>
        <ol>
          <li>Niniejszy regulamin (dalej "Regulamin") określa zasady korzystania z serwisu internetowego Moodzik.pl (dalej "Serwis"), prowadzonego przez [Nazwa Firmy/Twoje Imię i Nazwisko] z siedzibą w [Adres] (dalej "Usługodawca").</li>
          <li>Każdy użytkownik Serwisu (dalej "Użytkownik") zobowiązany jest do zapoznania się z treścią Regulaminu przed rozpoczęciem korzystania z Serwisu i przestrzegania jego postanowień.</li>
          <li>Korzystanie z Serwisu jest równoznaczne z akceptacją Regulaminu.</li>
        </ol>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">§ 2 Rodzaj i Zakres Usług</h2>
        <p>
          Serwis Moodzik.pl jest platformą blogową udostępniającą artykuły, poradniki oraz inne treści o charakterze [opisz tematykę bloga, np. informacyjnym, rozrywkowym, lifestyle'owym].
        </p>
        <p>
          Usługi świadczone przez Serwis są zasadniczo bezpłatne, chyba że wyraźnie wskazano inaczej.
        </p>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">§ 3 Warunki Korzystania z Serwisu</h2>
        <ol>
          <li>Użytkownik zobowiązuje się do korzystania z Serwisu w sposób zgodny z prawem, dobrymi obyczajami oraz postanowieniami niniejszego Regulaminu.</li>
          <li>Zabrania się Użytkownikowi dostarczania treści o charakterze bezprawnym, w tym treści wulgarnych, obraźliwych, naruszających dobra osobiste osób trzecich lub Usługodawcy.</li>
          <li>Usługodawca zastrzega sobie prawo do usuwania komentarzy lub innych treści zamieszczanych przez Użytkowników, które naruszają Regulamin lub przepisy prawa.</li>
        </ol>
      </section>
      
      <section>
        <h2 class="!text-2xl font-heading text-text-primary">§ X Prawa Autorskie</h2>
        <p>
          Wszelkie treści publikowane w Serwisie, w tym teksty, grafiki, logotypy, są chronione prawem autorskim i stanowią własność Usługodawcy lub zostały użyte za zgodą odpowiednich podmiotów. Kopiowanie, rozpowszechnianie lub wykorzystywanie tych treści bez pisemnej zgody Usługodawcy jest zabronione.
        </p>
      </section>

       <section>
        <h2 class="!text-2xl font-heading text-text-primary">§ Y Postanowienia Końcowe</h2>
        <ol>
          <li>Usługodawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie. O wszelkich zmianach Użytkownicy zostaną poinformowani poprzez publikację nowej wersji Regulaminu w Serwisie.</li>
          <li>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają odpowiednie przepisy prawa polskiego.</li>
          <li>Wszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd właściwy dla siedziby Usługodawcy.</li>
        </ol>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">§ Z Kontakt</h2>
        <p>
          W przypadku pytań lub wątpliwości dotyczących Regulaminu, prosimy o kontakt na adres e-mail: [Adres e-mail kontaktowy].
        </p>
      </section>

    </article>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blog', // lub 'default'
});

const effectiveDate = new Date('2025-05-19'); // Ustaw datę wejścia w życie regulaminu

const formatDate = (dateInput: Date) => {
  return dateInput.toLocaleDateString('pl-PL', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

useHead({
  title: 'Regulamin Serwisu - Moodzik.pl',
  meta: [
    { name: 'description', content: 'Zapoznaj się z regulaminem korzystania z serwisu Moodzik.pl.' },
    { name: 'robots', content: 'noindex, follow' }
  ]
});
</script>

<style>
/* Style dla .prose, jeśli nie są globalne, np. z layoutu */
.prose ol {
  list-style-type: decimal; /* Upewnij się, że numeracja jest dziesiętna */
}
.prose ul {
  list-style-type: disc; /* Upewnij się, że wypunktowanie to kropki */
}
</style>