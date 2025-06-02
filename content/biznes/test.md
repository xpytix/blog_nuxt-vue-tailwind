---
# Szablon Wpisu na Bloga (Frontmatter YAML)

# === Kluczowe Informacje o Treści ===

title: "Treść Sponsorowana"
# Główny tytuł (H1, <title>). Unikalny, z kluczowymi słowami.

description: "Krótki Opis Artykułu (150-160 znaków) dla SEO i social media."
# Podsumowanie dla wyszukiwarek i udostępnień, zachęcające do kliknięcia.

date: 2025-05-28 # Format YYYY-MM-DD.
# Data publikacji.

# === Uzupełniające Informacje o Treści (Ważne dla SEO i UX) ===

category: "Nazwa Kategorii" # np. Sport, Afery, Biznes
# Główna kategoria artykułu.

author: "" # lub "Nazwa Redakcji"
# Autor(ka) wpisu.

image: "/images/mainPartner.png" # np. /images/artykuly/moj-artykul.webp
# Ścieżka do głównego obrazka artykułu (z katalogu /public).

image_alt: "Partner"
# Tekst alternatywny obrazka (dla SEO i dostępności).

tags:
  - tag1
  - tag2
  - "tag z kilkoma słowami"
# Lista tagów powiązanych z artykułem.

# === Opcjonalne, ale Zalecane dla Pełniejszego SEO i Funkcjonalności ===

dateModified: 2025-05-29 # Format YYYY-MM-DD.
# Opcjonalnie: Data ostatniej modyfikacji. Ważna dla SEO.

# slug: "niestandardowy-slug-url"
# Opcjonalnie: Nadpisuje automatycznie generowany fragment URL (slug).

# === Twoje Niestandardowe Pola (zgodnie z komponentami) ===

isPartnerContent: "Sponsorowana" #tekst, jeśli treść partnerska/sponsorowana.
# Opcjonalnie: Oznaczenie treści partnerskiej.

# authorTwitterHandle: "@HandleAutora"
# Opcjonalnie: Uchwyt Twitter autora dla kart Twittera.

# UWAGA: Pola jak author, category, image_alt lepiej trzymać na głównym poziomie (jak wyżej),
# a nie w dodatkowym, zagnieżdżonym obiekcie 'meta', dla większej prostoty.

# === Treść Artykułu (Markdown) ===
---

Tutaj zaczyna się właściwa treść Twojego artykułu pisana w Markdown.
Możesz używać nagłówków (H2, H3 itd.), list, pogrubień i innych elementów Markdown.

## Podtytuł (H2)

Przykładowy akapit z **pogrubionym** tekstem i *kursywą*.

* Lista punktowana
* Kolejny element listy

1.  Lista numerowana
2.  Następny punkt

Więcej treści...