<script>
    import Heading1 from "$lib/components/utils/elements/headings/Heading1.svelte";
    import { NAVBAR } from "$lib/components/navigation/links/navbar";
    import { i18n } from "$lib/i18n.svelte";
</script>

<section class="appendix-section">
    <Heading1
        mainName={NAVBAR.find((link) => link.href === "/appendix")?.name[
            i18n.lang
        ] || ""}
    />
</section>

<style>
    .appendix-section {
        padding-top: 50px;
    }
</style>
