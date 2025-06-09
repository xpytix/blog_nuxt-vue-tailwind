---
title: "README Projektu: Stos Technologiczny i Architektura"
description: Techniczna dokumentacja projektu bloga wyjaśniająca architekturę
  opartą o Nuxt 3, Nuxt Content z Nuxt Studio, oraz Tailwind CSS. Przewodnik dla
  deweloperów.
date: 2025-06-06
category: Dokumentacja
author: Moodzik.pl
image: /images/LOGO.png
image_alt: "Schemat architektury projektu: Git, Nuxt Studio, Nuxt.js, Vercel/Netlify"
tags:
  - README
  - Nuxt 3
  - Nuxt Content
  - Nuxt Studio
  - Dokumentacja
isPartnerContent: Sponsorowana
---

## O Projekcie

Ten dokument to techniczne wprowadzenie (`README`) do projektu bloga. Jego celem jest szybkie zapoznanie deweloperów z wykorzystanym stosem technologicznym, architekturą oraz przyjętym sposobem zarządzania treścią.

Główne założenia projektu to:

- **Maksymalna wydajność:** Strony generowane statycznie (SSG) lub renderowane po stronie serwera (SSR) dla jak najszybszego ładowania.
- **Doskonałe SEO:** Pełna kontrola nad metadanymi i renderowanie treści po stronie serwera.
- **Nowoczesny Developer Experience (DX):** Wykorzystanie narzędzi, które automatyzują procesy i uprzyjemniają pracę.
- **Prostota zarządzania treścią:** Umożliwienie edycji zarówno przez deweloperów, jak i osoby nietechniczne.

## Stos Technologiczny (Tech Stack)

### 1. Framework: Nuxt 3

Aplikacja oparta jest o **Nuxt 3** (Vue.js). Kluczowe, wykorzystane funkcje to:

- **Środowisko deweloperskie Vite:** Gwarantuje błyskawiczny start i natychmiastowe odświeżanie zmian (HMR).
- **Renderowanie po stronie serwera (SSR):** Zapewnia optymalizację pod kątem wyszukiwarek.
- **Routing oparty na plikach:** Automatycznie generuje ścieżki URL na podstawie struktury katalogu `/pages`.
- **Auto-importy:** Komponenty i funkcje `composable` są dostępne globalnie bez potrzeby manualnego importu.

### 2. Zarządzanie Treścią: Nuxt Content + Nuxt Studio

Architektura treści opiera się na dwóch uzupełniających się narzędziach:

- **Fundament (Nuxt Content):** To "Git-based Headless CMS". Wszystkie artykuły (w tym ten) są plikami **Markdown (****.md****)** znajdującymi się w katalogu `/content` repozytorium. Metadane (tytuł, data, tagi) definiowane są w nagłówku każdego pliku (tzw. `frontmatter`). To jest jedyne i ostateczne źródło prawdy o treści.
- **Interfejs Edycyjny (Nuxt Studio):** Aby umożliwić prostą edycję treści bez konieczności pracy z kodem, projekt jest połączony z **Nuxt Studio**. Jest to wizualny edytor online, który:
  - Łączy się bezpośrednio z repozytorium GitHub projektu.
  - Pozwala na edycję plików `.md` i ich `frontmatter` przez przyjazny interfejs graficzny.
  - Każdy zapis w Nuxt Studio tworzy nowy commit w repozytorium, co automatycznie uruchamia proces budowania i wdrożenia nowej wersji strony.

To hybrydowe podejście zapewnia pełną kontrolę i elastyczność deweloperom (praca na plikach) oraz prostotę i wygodę edytorom treści (praca w Studio).

### 3. Stylowanie: Tailwind CSS

Interfejs użytkownika został zbudowany przy użyciu **Tailwind CSS** oraz modułu `@nuxtjs/tailwindcss`. Plugin `@tailwindcss/typography` (`prose`) odpowiada za automatyczne, estetyczne formatowanie treści generowanej z plików Markdown.

## Jak Zarządzać Treścią?

Istnieją dwie ścieżki edycji i dodawania nowych artykułów, w zależności od preferencji użytkownika.

#### A) Ścieżka Deweloperska (Praca z kodem)

1. Sklonuj repozytorium projektu.
2. W katalogu `/content` utwórz lub edytuj plik `.md`.
3. Zdefiniuj `frontmatter` na początku pliku.
4. Uruchom serwer deweloperski (`npm run dev`), aby zobaczyć zmiany.
5. Zatwierdź zmiany za pomocą `git commit` i `git push`, aby wdrożyć je na produkcję.

#### B) Ścieżka Wizualna (Nuxt Studio)

1. Przejdź na stronę [studio.nuxt.com](https://studio.nuxt.com) i zaloguj się za pomocą swojego konta GitHub.
2. Wybierz repozytorium tego projektu.
3. W interfejsie Studio wybierz artykuł do edycji lub stwórz nowy.
4. Wprowadź zmiany w treści lub metadanych, korzystając z edytora wizualnego.
5. Kliknij przycisk "Save", aby zapisać zmiany. Nuxt Studio automatycznie stworzy commit w Twoim imieniu i wdroży nową wersję strony.

---

## Dostępne Komponenty Treści (Style Guide)

Poniżej znajdują się przykłady gotowych komponentów, których można używać w plikach `.md`, aby wzbogacić treść.

### Komponenty moodzik:

::article-image-slider
---
items:
  - /images/LOGO.png
  - /images/biznes/btc-ath.jpg
---
::
