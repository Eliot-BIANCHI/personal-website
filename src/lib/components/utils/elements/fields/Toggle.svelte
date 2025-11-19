<script lang="ts">
    interface Props {
        label?: string;
        name: string;
        checked?: boolean;
        onchange?: (value: boolean) => void;
    }

    let { label, name, checked = false, onchange = () => {} }: Props = $props();

    let input: HTMLInputElement;
</script>

<div class="toggle-field">
    {#if label}
        <label class="label" for={name}>{label}</label>
    {/if}
    <input
        bind:this={input}
        id={name}
        type="checkbox"
        {checked}
        tabindex="-1"
        onchange={() => onchange(input.checked)}
    />
    <button
        class="toggle"
        onclick={() => {
            input.checked = !input.checked;
            onchange(input.checked);
        }}
        aria-label="toggle"
    ></button>
</div>

<style>
    input {
        opacity: 0;
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    .toggle-field {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .label {
        cursor: pointer;
        font-size: var(--font-base);
    }

    .toggle {
        --circle-size: 30px;
        --padding: 15px;
        background-color: var(--danger);
        border: none;
        border-radius: 99px;
        cursor: pointer;
        display: inline-block;
        height: calc(var(--circle-size) + var(--padding));
        outline: 2px solid transparent;
        outline-offset: var(--offset-md);
        position: relative;
        transition-property: background-color, opacity;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-timing-function);
        width: calc(var(--circle-size) * 2 + var(--padding));

        &::before {
            aspect-ratio: 1 / 1;
            background-color: var(--bg-primary-light);
            border-radius: 50%;
            content: "";
            display: inline-block;
            position: absolute;
            top: 50%;
            left: calc(var(--padding) / 2);
            transition: translate var(--transition);
            translate: 0 -50%;
            width: var(--circle-size);
        }

        &:hover {
            opacity: var(--base-opacity);
        }

        &:focus-visible {
            outline-color: var(--success);
        }
    }

    input:hover {
        & + .toggle {
            opacity: var(--base-opacity);
        }
    }

    input:checked {
        & + .toggle {
            background-color: var(--success);

            &::before {
                translate: 100% -50%;
            }
        }
    }
</style>
