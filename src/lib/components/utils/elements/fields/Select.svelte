<script lang="ts">
    import Icon from "../Icon.svelte";
    import type { SelectOption } from "./types";

    interface Props {
        label?: string;
        name: string;
        options: SelectOption[];
        onchange?: (value: string) => void;
    }

    let { label, name, options, onchange = () => {} }: Props = $props();

    let selected = $derived(options.find((option) => option.selected));

    let dialog: HTMLDialogElement;

    let opened = $state(false);

    $effect(() => {
        if (opened) {
            dialog.show();
        } else {
            dialog.close();
        }
    });

    function select(value: string) {
        options = options.map((option) => ({
            ...option,
            selected: option.value === value,
        }));
        onchange(value);
        opened = false;
    }
</script>

<div class="select-field">
    {#if label}
        <label class="label" for={name}>{label}:</label>
    {/if}

    <button class="selected" id={name} onclick={() => (opened = !opened)}>
        {#if selected}
            {#if selected.iconName}
                <Icon name={selected.iconName} />
            {/if}
            {selected.text}
        {:else}
            Select...
        {/if}
    </button>

    <dialog class="dialog" bind:this={dialog}>
        <ul class="options" class:opened>
            {#each options as option}
                <li class="option">
                    <button
                        class:selected={option.selected}
                        onclick={() => select(option.value)}
                    >
                        {#if option.iconName}
                            <Icon name={option.iconName} />
                        {/if}
                        {option.text}
                    </button>
                </li>
            {/each}
        </ul>
    </dialog>
</div>

<style>
    .select-field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .dialog {
        border: none;
        margin-inline: auto 0;
        padding: 0;
        bottom: 0;
        translate: 0 calc(100% + 5px);
        z-index: 10;
    }

    .label {
        font-size: var(--font-base);
    }

    .selected {
        background-color: var(--button);
        border: 1px solid var(--text);
        border-radius: var(--radius-sm);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: var(--font-base);
        outline: 2px solid transparent;
        outline-offset: var(--offset-md);
        transition: background-color var(--transition);

        &:hover {
            background-color: var(--button-strong);
        }

        &:focus-visible {
            outline-color: var(--app-color);
        }
    }

    .options {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin-block: 0;
        padding-left: 0;
    }

    .option {
        & > button {
            background-color: var(--button);
            border: none;
            color: var(--text);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 30px;
            font-size: var(--font-base);
            outline: 2px solid transparent;
            outline-offset: -6px;
            padding: 10px;
            transition-property: background-color, color, opacity;
            transition-duration: var(--transition-duration);
            transition-timing-function: var(--transition-timing-function);
            width: 100%;

            &:hover {
                background-color: var(--button-strong);
            }

            &:focus-visible {
                outline-color: var(--app-color);
            }

            &.selected {
                opacity: var(--base-opacity);
            }
        }

        &:first-child > button {
            border-top-left-radius: var(--radius-md);
            border-top-right-radius: var(--radius-md);
        }

        &:last-child > button {
            border-bottom-left-radius: var(--radius-md);
            border-bottom-right-radius: var(--radius-md);
        }
    }
</style>
