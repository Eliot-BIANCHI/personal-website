<script lang="ts">
    import Icon from "$lib/components/utils/elements/Icon.svelte";

    let on = $state(false);
</script>

<span class="toggle-assistant__container">
    <button
        class="toggle-assistant"
        class:on
        aria-label="toggle-assistant"
        onclick={() => (on = !on)}
    >
    </button>
    <span class="toggle-assistant__on">
        <Icon name="microphone" />
    </span>
</span>

<style>
    .toggle-assistant__container {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .toggle-assistant {
        aspect-ratio: 1 / 1;
        background-image: linear-gradient(
            45deg,
            var(--app-color-2) 30%,
            var(--app-color) 60%
        );
        border: none;
        border-radius: 50%;
        cursor: pointer;
        outline: 2px solid transparent;
        outline-offset: var(--offset-md);
        transition: rotate var(--transition);
        width: 40px;

        &:hover {
            rotate: 180deg;
        }

        &:focus-visible {
            outline-color: var(--app-color);
        }

        &.on + .toggle-assistant__on {
            opacity: 1;
        }
    }

    .toggle-assistant__on {
        background-color: var(--danger);
        border-radius: 50%;
        opacity: 0;
        padding: 3px;
        position: absolute;
        top: -10px;
        right: -10px;
        transition: opacity var(--transition);
    }
</style>
