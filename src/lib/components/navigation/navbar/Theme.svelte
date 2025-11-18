<script lang="ts">
    import Icon from "$lib/components/utils/elements/Icon.svelte";

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    let darkTheme = $state(prefersDarkScheme.matches);
</script>

<button
    class="toggle-theme"
    onclick={() => {
        darkTheme = !darkTheme;
        if (darkTheme) {
            document.documentElement.dataset.theme = "dark";
        } else {
            document.documentElement.dataset.theme = "light";
        }
    }}
    aria-label="toggle-light-dark-theme"
>
    <span class="theme" class:moon={darkTheme}>
        <Icon name={darkTheme ? "theme--moon" : "theme--sun"} />
    </span>
</button>

<style>
    .toggle-theme {
        --theme-bg: rgb(200 200 100 / 0.5);
        --theme-size: 30px;
        --padding: 10px;
        --gap: 10px;
        background-color: var(--theme-bg);
        border: none;
        border-radius: 99px;
        cursor: pointer;
        height: 40px;
        min-height: 40px;
        outline: 2px solid transparent;
        outline-offset: var(--offset-md);
        position: relative;
        transition: background-color var(--transition);
        width: calc(var(--theme-size) * 2 + var(--padding) + var(--gap));

        &:hover {
            background-color: var(--bg-secondary);
        }

        &:focus-visible {
            outline-color: var(--app-color);
        }
    }

    .theme {
        background-color: var(--bg-secondary);
        border-radius: 99px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        position: absolute;
        top: 50%;
        left: calc(var(--padding) / 2);
        transition-property: background-color, translate;
        transition-duration: var(--transition-duration);
        translate: 0 -50%;
        width: var(--theme-size);

        &.moon {
            translate: calc(100% + var(--gap)) -50%;
        }
    }
</style>
