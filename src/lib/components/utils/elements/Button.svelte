<script lang="ts">
    import Icon from "./Icon.svelte";
    import type { ButtonClasses, IconName, ButtonClickEvent } from "./types";

    interface Props {
        text?: string;
        iconName?: IconName;
        classes?: ButtonClasses;
        disabled?: boolean;
        onclick?: (event: ButtonClickEvent) => void;
    }

    let {
        text,
        iconName,
        classes = {},
        disabled = false,
        onclick = () => {},
    }: Props = $props();

    let top = $derived(
        classes.positioned?.top ? `${classes.positioned.top}px` : "auto",
    );

    let bottom = $derived(
        classes.positioned?.bottom ? `${classes.positioned.bottom}px` : "auto",
    );

    let left = $derived(
        classes.positioned?.left ? `${classes.positioned.left}px` : "auto",
    );

    let right = $derived(
        classes.positioned?.right ? `${classes.positioned.right}px` : "auto",
    );
</script>

<button
    {disabled}
    {onclick}
    class="button"
    class:round={classes.round}
    class:success={classes.color === "success"}
    class:warning={classes.color === "warning"}
    class:danger={classes.color === "danger"}
    class:info={classes.color === "info"}
    class:hide-above-1024={classes.hide?.above1024}
    class:hide-below-1024={classes.hide?.below1024}
    class:position-relative={classes.position === "relative"}
    class:position-absolute={classes.position === "absolute"}
    class:position-fixed={classes.position === "fixed"}
    style="top: {top}; bottom: {bottom}; left: {left}; right: {right};"
>
    {#if iconName}
        <Icon name={iconName} />
    {/if}
    {text}
</button>

<style>
    .button {
        background-color: var(--button);
        border: none;
        border-radius: var(--radius-md);
        box-sizing: border-box;
        color: var(--text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: var(--font-md);
        outline: 2px solid transparent;
        outline-offset: var(--offset-md);
        padding: 4px 8px;
        transition-property: background-color, color, opacity;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-timing-function);

        &:not(:disabled):hover {
            background-color: var(--button-strong);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &:focus-visible {
            outline-color: var(--app-color);
        }

        &.round {
            aspect-ratio: 1 / 1;
            border-radius: 99px;
            padding: 5px;
        }

        &.success {
            background-color: var(--success);
        }

        &.warning {
            background-color: var(--warning);
        }

        &.danger {
            background-color: var(--danger);
        }

        &.info {
            background-color: var(--info);
        }

        &.position-relative {
            position: relative;
        }

        &.position-absolute {
            position: absolute;
        }

        &.position-fixed {
            position: fixed;
        }
    }

    @media all and (width >= 1024px) {
        .button.hide-above-1024 {
            display: none;
        }
    }

    @media all and (width < 1024px) {
        .button.hide-below-1024 {
            display: none;
        }
    }
</style>
