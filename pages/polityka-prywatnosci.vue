// pages/polityka-prywatnosci.vue
<template>
  <div class="container mx-auto px-4 py-8 lg:py-12">
    <article class="prose dark:prose-invert lg:prose-xl mx-auto bg-background-secondary p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
      <header class="mb-8">
        <h1 class="!text-3xl sm:!text-4xl font-heading text-text-primary !mb-3 !leading-tight">
          Polityka Prywatności
        </h1>
        <p class="text-sm text-text-secondary">
          Ostatnia aktualizacja: {{ formatDate(lastUpdated) }}
        </p>
      </header>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">1. Wprowadzenie</h2>
        <p>
          Witamy na stronie Moodzik.pl. Niniejsza Polityka Prywatności wyjaśnia, jakie dane osobowe zbieramy od Ciebie, jak je wykorzystujemy, przechowujemy oraz jakie masz prawa w związku z przetwarzaniem Twoich danych. Dbamy o Twoją prywatność i zobowiązujemy się do ochrony Twoich danych osobowych zgodnie z obowiązującymi przepisami prawa, w tym z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
        </p>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">2. Administrator Danych Osobowych</h2>
        <p>
          Administratorem Twoich danych osobowych jest [Nazwa Firmy/Twoje Imię i Nazwisko], z siedzibą w [Adres], NIP: [NIP], REGON: [REGON] (dalej jako "Administrator" lub "My").
        </p>
        <p>
          Kontakt z Administratorem jest możliwy poprzez adres e-mail: [Adres e-mail kontaktowy] lub pisemnie na adres siedziby.
        </p>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">3. Jakie dane zbieramy?</h2>
        <p>
          Podczas korzystania z naszej strony możemy zbierać następujące rodzaje danych:
        </p>
        <ul>
          <li><strong>Dane podawane dobrowolnie:</strong> np. imię, nazwisko, adres e-mail podczas subskrypcji newslettera, komentowania artykułów lub kontaktu za pomocą formularza.</li>
          <li><strong>Dane zbierane automatycznie:</strong> adres IP, typ przeglądarki, system operacyjny, strony odsyłające, strony odwiedzane na naszej witrynie, daty i godziny wizyt, dane o lokalizacji (jeśli wyrazisz na to zgodę), pliki cookies.</li>
        </ul>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">4. W jakim celu przetwarzamy Twoje dane?</h2>
        <p>
          Twoje dane osobowe przetwarzamy w następujących celach:
        </p>
        <ul>
          <li>Świadczenia usług drogą elektroniczną, w tym dostarczania treści na stronie.</li>
          <li>Obsługi zapytań kierowanych za pomocą formularza kontaktowego lub e-mail.</li>
          <li>Wysyłki newslettera (za Twoją zgodą).</li>
          <li>Analizy statystycznej i poprawy działania strony.</li>
          <li>Zapewnienia bezpieczeństwa strony i wykrywania nadużyć.</li>
          <li>Wypełnienia obowiązków prawnych ciążących na Administratorze.</li>
        </ul>
      </section>
      
      <section>
        <h2 class="!text-2xl font-heading text-text-primary">5. Pliki Cookies</h2>
        <p>
          Nasza strona wykorzystuje pliki cookies (ciasteczka). Są to małe pliki tekstowe przechowywane na Twoim urządzeniu końcowym. Używamy plików cookies w celu poprawy działania strony, analizy ruchu oraz w celach marketingowych. Więcej informacji o plikach cookies znajdziesz w naszej [Link do oddzielnej Polityki Cookies, jeśli istnieje, lub rozwiń tutaj].
        </p>
        <p>
          Możesz zarządzać ustawieniami plików cookies z poziomu swojej przeglądarki internetowej.
        </p>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">X. Twoje Prawa</h2>
        <p>
          Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu wobec przetwarzania oraz wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych).
        </p>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">Y. Zmiany w Polityce Prywatności</h2>
        <p>
          Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. Wszelkie zmiany będą publikowane na tej stronie. Zalecamy regularne sprawdzanie tej strony w celu zapoznania się z aktualną wersją polityki.
        </p>
      </section>

      <section>
        <h2 class="!text-2xl font-heading text-text-primary">Z. Kontakt</h2>
        <p>
          W przypadku pytań dotyczących przetwarzania Twoich danych osobowych lub niniejszej Polityki Prywatności, prosimy o kontakt na adres e-mail: [Adres e-mail kontaktowy].
        </p>
      </section>

    </article>
  </div>
</template>

<script setup lang="ts">
// Definicja layoutu - możesz użyć 'blog' jeśli ma mieć nagłówek i stopkę bloga,
// lub stworzyć bardziej generyczny layout 'default' dla takich stron.
// Jeśli masz `layouts/default.vue`, Nuxt użyje go automatycznie, jeśli nie określisz innego.
definePageMeta({
  layout: 'blog', // lub 'default', lub pomiń, aby użyć domyślnego layoutu Nuxta
});

const lastUpdated = new Date('2025-05-19'); // Ustaw aktualną datę ostatniej aktualizacji

const formatDate = (dateInput: Date) => {
  return dateInput.toLocaleDateString('pl-PL', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

useHead({
  title: 'Polityka Prywatności - Moodzik.pl',
  meta: [
    { name: 'description', content: 'Zapoznaj się z polityką prywatności serwisu Moodzik.pl.' },
    { name: 'robots', content: 'noindex, follow' } // Ważne, aby tymczasowe/niegotowe strony nie były indeksowane
  ]
});
</script>

<style scoped>

.prose h1, .prose h2, .prose h3 {
  font-family: var(--font-heading);
  color: rgb(var(--color-text-primary));
}
.prose p, .prose ul, .prose ol, .prose li {
  font-family: var(--font-sans);
  color: rgb(var(--color-text-primary));
  margin-bottom: 1em;
}
.prose ul, .prose ol {
  padding-left: 1.5em;
}
.prose li {
  margin-bottom: 0.5em;
}
.prose a {
  color: rgb(var(--color-accent));
  text-decoration: underline;
}
.prose a:hover {
  opacity: 0.8;
}
</style>