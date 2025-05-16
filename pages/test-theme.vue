// app.vue LUB np. pages/test-theme.vue
<template>
    <div class="p-8 min-h-screen bg-background-primary text-text-primary transition-colors duration-300">
        <header class="mb-8">
            <ThemeSwitcher />
        </header>
        <h1 class="text-4xl font-bold text-text-primary font-heading mb-6">
            Test Nagłówka z Dela Gothic One
        </h1>
        <p class="font-sans text-text-secondary">
            Ten paragraf używa fontu Inter.
        </p>


        <p class="mb-4">
            Ten nagłówek (`h1`) powyżej używa klasy `text-accent`. Jego kolor powinien zmieniać się
            wraz z wybranym motywem, ponieważ `--color-accent` jest zdefiniowany inaczej
            dla motywu `.light` i `.dark` w Twoim pliku `themes.css`.
        </p>

        <div class="mt-8 p-4 border border-border-theme bg-background-secondary rounded">
            <p>Aktualna preferencja motywu (z ThemeSwitcher): <code
                    class="bg-background-primary p-1 rounded">{{ colorMode.preference }}</code></p>
            <p>Aktualnie zastosowany motyw (na `&lt;html&gt;`): <code
                    class="bg-background-primary p-1 rounded">{{ appliedMode }}</code></p>
            <p class="mt-2">Ten kontener używa `bg-background-secondary` i `border-border-theme`.</p>
            <button class="mt-2 px-3 py-1 bg-primary text-text-on-primary rounded">Przycisk `bg-primary`</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// Jeśli ThemeSwitcher nie jest globalny, zaimportuj go:
// import ThemeSwitcher from '~/components/ThemeSwitcher.vue';

const colorMode = useColorMode();
const appliedMode = ref('');

const updateAppliedMode = () => {
    if (process.client) {
        const htmlClasses = document.documentElement.className;
        if (htmlClasses.includes('dark')) {
            appliedMode.value = 'dark';
        } else if (htmlClasses.includes('light')) {
            appliedMode.value = 'light';
        } else {
            // Jeśli 'system' jest aktywny, colorMode.value pokaże faktyczny tryb (light/dark)
            appliedMode.value = `${colorMode.value} (via system preference)`;
        }
    }
};

onMounted(() => {
    updateAppliedMode();
});

// Obserwuj zmiany w preferencji, aby zaktualizować wyświetlany 'appliedMode'
watch(colorMode.preference, () => {
    // Daj chwilę modułowi na aktualizację klasy na <html>
    setTimeout(updateAppliedMode, 50);
});

// Obserwuj też bezpośrednio colorMode.value, które odzwierciedla faktyczny tryb
watch(colorMode.value, (newValue) => {
    console.log('Faktyczny tryb zmieniony na:', newValue);
    updateAppliedMode();
});
</script>

<style scoped>
code {
    font-family: monospace;
}
</style>