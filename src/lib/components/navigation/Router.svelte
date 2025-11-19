<script lang="ts">
    import Appendix from "$lib/pages/Appendix.svelte";
    import Home from "$lib/pages/Home.svelte";
    import Courses from "$lib/pages/Courses.svelte";
    import NotFound from "$lib/pages/NotFound.svelte";
    import Sandbox from "$lib/pages/Sandbox.svelte";

    import { LINKS, type Href } from "./types";

    const getPath = () => (location.hash.slice(1) || "/") as Href;

    let currentRoute: Href = $state(getPath());

    $effect(() => {
        const link = LINKS.find((link) => link.href === currentRoute);
        if (link === undefined) return;
        document.title = link.name;
    });

    function onhashchange() {
        currentRoute = getPath();
    }
</script>

<svelte:window {onhashchange} />

<div class="router">
    {#if currentRoute === "/"}
        <Home />
    {:else if currentRoute === "/appendix"}
        <Appendix />
    {:else if currentRoute === "/courses"}
        <Courses />
    {:else if currentRoute === "/sandbox"}
        <Sandbox />
    {:else}
        <NotFound />
    {/if}
</div>
