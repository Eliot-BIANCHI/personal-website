<script lang="ts">
    import ArrowCompress from "./icons/arrows/Compress.svelte";
    import ArrowDown from "./icons/arrows/Down.svelte";
    import ArrowDownWithStroke from "./icons/arrows/DownWithStroke.svelte";
    import ArrowExpand from "./icons/arrows/Expand.svelte";
    import ArrowUp from "./icons/arrows/Up.svelte";
    import ArrowUpWithStroke from "./icons/arrows/UpWithStroke.svelte";

    import SuitClub from "./icons/suits/Club.svelte";
    import SuitDiamond from "./icons/suits/Diamond.svelte";
    import SuitHeart from "./icons/suits/Heart.svelte";
    import SuitSpade from "./icons/suits/Spade.svelte";

    import Cross from "./icons/Cross.svelte";
    import Menu from "./icons/Menu.svelte";

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
{:else if name === "suit--club"}
    <SuitClub />
{:else if name === "suit--diamond"}
    <SuitDiamond />
{:else if name === "suit--heart"}
    <SuitHeart />
{:else if name === "suit--spade"}
    <SuitSpade />
{/if}
