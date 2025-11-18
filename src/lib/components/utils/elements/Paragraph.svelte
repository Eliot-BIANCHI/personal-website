<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
</script>

<p class="paragraph">
    {@render children()}
</p>

<style>
    .paragraph {
        color: var(--text);
        font-size: var(--font-base);
        margin-block: 0;
        transition: color var(--transition);
    }
</style>
