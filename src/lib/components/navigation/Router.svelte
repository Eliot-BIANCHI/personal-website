<script lang="ts">
    import Appendix from "$lib/pages/Appendix.svelte";
    import Home from "$lib/pages/Home.svelte";
    import Courses from "$lib/pages/Courses.svelte";
    import NotFound from "$lib/pages/NotFound.svelte";
    import Sandbox from "$lib/pages/Sandbox.svelte";

    import ProbabilitiesFormulas from "$lib/pages/mathematics/probabilities/Formulas.svelte";
    import ProbabilitiesIntroduction from "$lib/pages/mathematics/probabilities/Introduction.svelte";

    import { NAVBAR, type Href as NavbarHref } from "./links/navbar";
    import {
        COURSES_FLATTENED,
        type Href as CourseHref,
    } from "./links/courses";
    import { i18n } from "$lib/i18n.svelte";
    import type { LocalizedName } from "$lib/types";

    type Href = NavbarHref | CourseHref;

    const getPath = () => (location.hash.slice(1) || "/") as Href;

    let currentRoute: Href = $state(getPath());

    const NOT_FOUND: LocalizedName = {
        en: "Not found",
        fr: "Page non trouvée",
    };

    $effect(() => {
        const navbarLink = NAVBAR.find((link) => link.href === currentRoute);
        const courseLink = COURSES_FLATTENED.find(
            (link) => link.href === currentRoute,
        );

        if (navbarLink !== undefined) {
            document.title = navbarLink.name[i18n.lang];
        } else if (courseLink !== undefined) {
            document.title = courseLink.name[i18n.lang];
        } else {
            document.title = NOT_FOUND[i18n.lang];
        }
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
    {:else if currentRoute === "/mathematics/probabilities/formulas"}
        <ProbabilitiesFormulas />
    {:else if currentRoute === "/mathematics/probabilities/introduction"}
        <ProbabilitiesIntroduction />
    {:else}
        <NotFound />
    {/if}
</div>
