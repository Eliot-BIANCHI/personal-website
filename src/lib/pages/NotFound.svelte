<script>
    import Paragraph from "$lib/components/utils/elements/Paragraph.svelte";
</script>

<section class="not-found">
    <h1>404</h1>
    <Paragraph>La page que vous cherchez est introuvable</Paragraph>
</section>

<style>
    .not-found {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        height: calc(100dvh - var(--navbar-height));

        & h1 {
            color: var(--color);
            font-size: 4em;
            margin-block: 0;
            transition: color var(--transition);
        }
    }
</style>
