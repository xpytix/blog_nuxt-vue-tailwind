---
title: "Przewodnik po Nuxt Studio: Jak Zarządzać Treścią na Stronie?"
description: Uniwersalny poradnik krok po kroku, jak tworzyć i edytować treści
  za pomocą wizualnego edytora Nuxt Studio na stronach opartych o Nuxt Content.
date: 2025-06-06
category: Poradniki
author: Redakcja Techniczna
image: /images/wpis-z-nuxt-studio.png
image_alt: Interfejs wizualnego edytora Nuxt Studio
tags:
  - Nuxt Studio
  - Poradnik
  - Zarządzanie treścią
  - CMS
  - Markdown
---

Witaj! Ten dokument to uniwersalny przewodnik, który pomoże Ci w łatwy sposób zarządzać treścią na stronie internetowej za pomocą narzędzia \*\*Nuxt Studio\*\*.

Nuxt Studio to nowoczesny edytor wizualny, który pozwala na edycję treści bezpośrednio na stronie, bez potrzeby znajomości programowania. Niezależnie od tego, czy dodajesz nowy artykuł na blogu, czy aktualizujesz stronę produktową, ten poradnik przeprowadzi Cię przez cały proces.

\## **Krok 1: Logowanie do Nuxt Studio**

1\. Otwórz przeglądarkę i wejdź na stronę: \*\*\[studio.nuxt.com]\(<https://studio.nuxt.com)**>

2\. Zaloguj się, używając swojego konta \*\*GitHub\*\*. Musisz mieć uprawnienia do repozytorium projektu, nad którym pracujesz.

3\. Po zalogowaniu wybierz właściwy projekt z listy dostępnych repozytoriów.

\::ArticleImageSlider{\:items='\["/images/LOGO.png", "/images/wpis-z-nuxt-studio\_2.png", "/images/wpis-z-nuxt-studio\_2.png", "/images/wpis-z-nuxt-studio\_3.png"]'} ::

\## Krok 2: Tworzenie Nowej Strony lub Wpisu

## W panelu Nuxt Studio zobaczysz strukturę plików projektu.

## 1. W menu po lewej stronie przejdź do katalogu, w którym przechowywana jest treść (zazwyczaj nazywa się on `content/`).

2\. Wybierz odpowiednią podkategorię (np. `blog`, `aktualnosci`, `uslugi`).

3\. Kliknij przycisk \*\*"Create page"\*\* (lub podobny), aby dodać nowy plik.

4\. Nadaj plikowi \*\*przyjazną dla SEO nazwę\*\*, która stanie się częścią adresu URL. Stosuj zasady: małe litery, brak polskich znaków, słowa oddzielone myślnikami (np. `nasza-nowa-usluga-marketingowa`).

\## Krok 3: Uzupełnianie Metadanych (Frontmatter)

Każdy wpis posiada sekcję z metadanymi, która opisuje jego zawartość. Znajdziesz ją w panelu po prawej stronie edytora. Wypełnij ją starannie.

\### Podstawowe Pola

\* `title`: \*\*Główny tytuł strony lub artykułu.\*\* Kluczowy dla SEO.

\* `description`: \*\*Krótki opis (ok. 150-160 znaków).\*\* Wyświetlany m.in. w wynikach wyszukiwania Google.

\* `date`: \*\*Data publikacji\*\* w formacie `RRRR-MM-DD` (np. `2025-06-06`).

\* `author`: \*\*Autor wpisu.\*\*

\* `image`: \*\*Główny obrazek.\*\* Podaj pełną ścieżkę, np. `/images/blog/tytul-wpisu.jpg`.

\* `image_alt`: \*\*Tekst alternatywny\*\* dla obrazka – krótki opis tego, co przedstawia.

\* `tags`: \*\*Lista tagów lub słów kluczowych.\*\* Każdy tag wpisz w nowej linii, poprzedzając go myślnikiem `-`.

\### Pola Opcjonalne

Twój projekt może zawierać dodatkowe, opcjonalne pola, które zmieniają sposób wyświetlania treści.

\* `isPartnerContent`: \*\*Etykieta treści partnerskiej.\*\* Jeśli chcesz oznaczyć wpis jako sponsorowany lub partnerski, wpisz w to pole odpowiedni tekst, np. "Artykuł sponsorowany" lub "Współpraca płatna". Jeśli pole pozostanie puste lub zostanie usunięte, żadna etykieta się nie pojawi.

\## Krok 4: Pisanie i Formatowanie Treści (Markdown)

Główną treść wpisujesz w edytorze tekstowym, używając prostego języka formatowania \*\*Markdown\*\*. Najważniejsze znaczniki:

\* Nagłówki: `## Podtytuł`, `### Mniejszy nagłówek`

\* Pogrubienie: `**tekst pogrubiony**`

\* Kursywa: `*tekst pochylony*`

\* Listy: `- Pierwszy punkt` lub `1. Pierwszy punkt`

\* Cytaty: `> Cytowany fragment`

\* Linki: `[Wyświetlany tekst](https://adres-strony.com)`

\## Krok 5: Korzystanie z Komponentów Specjalnych

Aby uatrakcyjnić treść, możesz używać gotowych, niestandardowych komponentów (jeśli projekt je udostępnia). Wstawia się je bezpośrednio w treść za pomocą specjalnej składni.

\*\*Przykład 1: Alert\*\*

\`\`\`markdown

\::Alert{type="success"}

To jest komunikat o sukcesie. Idealny do podsumowań.

\::
