<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Gap, Placement, Alignment } from "$lib/types";

    interface Props {
        children: Snippet;
        horizontal?: boolean;
        itemsGap?: Gap;
        itemsPlacement?: Placement;
        itemsAlignment?: Alignment;
        bullet?: boolean;
    }

    let {
        children,
        horizontal = false,
        itemsGap = "medium",
        itemsPlacement = "left",
        itemsAlignment = "left",
        bullet = false,
    }: Props = $props();
</script>

<ul
    class="list"
    class:horizontal
    class:bullet
    class:items-gap-xs={itemsGap === "xs"}
    class:items-gap-small={itemsGap === "small"}
    class:items-gap-medium={itemsGap === "medium"}
    class:items-gap-large={itemsGap === "large"}
    class:items-gap-xl={itemsGap === "xl"}
    class:items-placement-left={itemsPlacement === "left"}
    class:items-placement-right={itemsPlacement === "right"}
    class:items-placement-center={itemsPlacement === "center"}
    class:items-placement-around={itemsPlacement === "around"}
    class:items-placement-between={itemsPlacement === "between"}
    class:items-placement-evenly={itemsPlacement === "evenly"}
    class:items-alignement-left={itemsAlignment === "left"}
    class:items-alignement-right={itemsAlignment === "right"}
    class:items-alignement-center={itemsAlignment === "center"}
    class:items-alignement-stretch={itemsAlignment === "stretch"}
>
    {@render children()}
</ul>

<style>
    .list {
        display: flex;
        flex-direction: column;
        font-size: var(--font-base);
        list-style: none;
        margin-block: 0;
        padding-left: 0;

        &.horizontal {
            flex-direction: row;
        }

        &.bullet {
            --padding-left: 20px;
            padding-left: var(--padding-left);

            & :global(li) {
                position: relative;

                &::before {
                    aspect-ratio: 1 / 1;
                    background-color: var(--text);
                    border-radius: var(--radius-md);
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: calc(var(--padding-left) * -1);
                    transition: background-color var(--transition);
                    translate: 0 -50%;
                    width: 7px;
                }
            }
        }

        &.items-gap-xs {
            gap: var(--font-xs);
            background-color: red;
        }

        &.items-gap-small {
            gap: var(--font-sm);
        }

        &.items-gap-medium {
            gap: var(--font-md);
        }

        &.items-gap-large {
            gap: var(--font-lg);
        }

        &.items-gap-xl {
            gap: var(--font-xl);
        }

        &.items-placement-left {
            justify-content: start;
        }

        &.items-placement-right {
            justify-content: end;
        }

        &.items-placement-center {
            justify-content: center;
        }

        &.items-placement-around {
            justify-content: space-around;
        }

        &.items-placement-between {
            justify-content: space-between;
        }

        &.items-placement-evenly {
            justify-content: space-evenly;
        }

        &.items-alignement-left {
            align-items: start;
        }

        &.items-alignement-right {
            align-items: end;
        }

        &.items-alignement-center {
            align-items: center;
        }

        &.items-alignement-stretch {
            align-items: stretch;
        }
    }
</style>
