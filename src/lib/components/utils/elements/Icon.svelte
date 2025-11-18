<script lang="ts">
    import ArrowCompress from "./icons/arrows/Compress.svelte";
    import ArrowDown from "./icons/arrows/Down.svelte";
    import ArrowDownWithStroke from "./icons/arrows/DownWithStroke.svelte";
    import ArrowExpand from "./icons/arrows/Expand.svelte";
    import ArrowUp from "./icons/arrows/Up.svelte";
    import ArrowUpWithStroke from "./icons/arrows/UpWithStroke.svelte";

    import Cross from "./icons/Cross.svelte";
    import Menu from "./icons/Menu.svelte";
    import Microphone from "./icons/Microphone.svelte";

    import NavbarAppendix from "./icons/navbar/Appendix.svelte";
    import NavbarCourses from "./icons/navbar/Courses.svelte";
    import NavbarHome from "./icons/navbar/Home.svelte";
    import NavbarNotFound from "./icons/navbar/NotFound.svelte";
    import NavbarSandbox from "./icons/navbar/Sandbox.svelte";

    import Settings from "./icons/Settings.svelte";

    import SuitClub from "./icons/suits/Club.svelte";
    import SuitDiamond from "./icons/suits/Diamond.svelte";
    import SuitHeart from "./icons/suits/Heart.svelte";
    import SuitSpade from "./icons/suits/Spade.svelte";

    import Moon from "./icons/theme/Moon.svelte";
    import Sun from "./icons/theme/Sun.svelte";

    import VerticalDots from "./icons/VerticalDots.svelte";

    import type { IconName } from "./types";

    interface Props {
        name: IconName;
    }

    let { name }: Props = $props();
</script>

{#if name === "arrow--compress"}
    <ArrowCompress />
{:else if name === "arrow--down"}
    <ArrowDown />
{:else if name === "arrow--down-with-stroke"}
    <ArrowDownWithStroke />
{:else if name === "arrow--expand"}
    <ArrowExpand />
{:else if name === "arrow--up"}
    <ArrowUp />
{:else if name === "arrow--up-with-stroke"}
    <ArrowUpWithStroke />
{:else if name === "cross"}
    <Cross />
{:else if name === "menu"}
    <Menu />
{:else if name === "microphone"}
    <Microphone />
{:else if name === "navbar--appendix"}
    <NavbarAppendix />
{:else if name === "navbar--courses"}
    <NavbarCourses />
{:else if name === "navbar--home"}
    <NavbarHome />
{:else if name === "navbar--not-found"}
    <NavbarNotFound />
{:else if name === "navbar--sandbox"}
    <NavbarSandbox />
{:else if name === "settings"}
    <Settings />
{:else if name === "suit--club"}
    <SuitClub />
{:else if name === "suit--diamond"}
    <SuitDiamond />
{:else if name === "suit--heart"}
    <SuitHeart />
{:else if name === "suit--spade"}
    <SuitSpade />
{:else if name === "theme--moon"}
    <Moon />
{:else if name === "theme--sun"}
    <Sun />
{:else if name === "vertical-dots"}
    <VerticalDots />
{/if}
