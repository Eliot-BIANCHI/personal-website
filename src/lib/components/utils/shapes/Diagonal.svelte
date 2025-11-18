<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        invert?: boolean;
    }

    let { children, invert = false }: Props = $props();
</script>

<div class="shape-diagonal" class:invert>
    {@render children()}
</div>

<style>
    .shape-diagonal {
        --background-color: var(--app-color-strong);
        --skew-angle: -5deg;
        isolation: isolate;
        position: relative;

        &.invert {
            --background-color: var(--app-color-2);
            --skew-angle: 5deg;
        }

        &::after {
            background-color: var(--background-color);
            content: "";
            position: absolute;
            inset: 0;
            transform: skewY(var(--skew-angle));
            z-index: -1;
        }
    }
</style>
