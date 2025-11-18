<script lang="ts">
    import type { InputType } from "./types";

    interface Props {
        label?: string;
        name: string;
        type?: InputType;
        value?: string;
        step?: number;
        oninput?: (value: string) => void;
        onchange?: (value: string) => void;
        small?: boolean;
    }

    let {
        label,
        name,
        type = "text",
        value,
        step = 1,
        oninput = () => {},
        onchange = () => {},
        small = false,
    }: Props = $props();

    let input: HTMLInputElement;

    function sanitize(): string {
        if (type === "number") {
            input.value = input.value.replace(/[^\d.-]/g, "");
        }
        return input.value;
    }

    let repeatTimer: number | undefined = $state(undefined);

    function startRepeat(delta: number) {
        change(delta);
        repeatTimer = setTimeout(function tick() {
            change(delta);
            repeatTimer = setTimeout(tick, 100);
        }, 300);
    }

    function stopRepeat() {
        clearTimeout(repeatTimer);
        repeatTimer = undefined;
    }

    function change(delta: number) {
        const current = parseFloat(input.value) || 0;
        const decimals = (input.value.split(".")[1] || "").length;

        const result = current + delta;
        input.value = result.toFixed(decimals);

        onchange(input.value);
    }
</script>

<div class="field">
    {#if label}
        <label class="label" for={name}>{label}:</label>
    {/if}

    <div class="input-container">
        <input
            id={name}
            bind:this={input}
            {name}
            class="input"
            class:small
            type="text"
            {value}
            oninput={() => oninput(sanitize())}
            onchange={() => onchange(sanitize())}
            onkeydown={(event) => {
                if (
                    (event.code === "ArrowUp" || event.code === "ArrowDown") &&
                    !event.repeat
                ) {
                    event.preventDefault();
                    startRepeat(event.code === "ArrowUp" ? step : -step);
                }
            }}
            onkeyup={(event) => {
                if (event.code === "ArrowUp" || event.code === "ArrowDown") {
                    stopRepeat();
                }
            }}
            onblur={stopRepeat}
        />

        {#if type === "number"}
            <div class="input-spinners" role="spinbutton">
                <button
                    type="button"
                    class="number-spinners__increment"
                    aria-label="Increase value"
                    tabindex="-1"
                    onmousedown={() => startRepeat(step)}
                    onmouseup={stopRepeat}
                    onmouseleave={stopRepeat}
                    onkeydown={(event) => {
                        if (
                            (event.code === "Space" ||
                                event.code === "Enter") &&
                            !event.repeat
                        ) {
                            event.preventDefault();
                            startRepeat(step);
                        }
                    }}
                    onkeyup={(event) => {
                        if (event.code === "Space" || event.code === "Enter") {
                            stopRepeat();
                        }
                    }}
                >
                    +
                </button>
                <button
                    type="button"
                    class="number-spinners__decrement"
                    aria-label="Decrease value"
                    tabindex="-1"
                    onmousedown={() => startRepeat(-step)}
                    onmouseup={stopRepeat}
                    onmouseleave={stopRepeat}
                    onkeydown={(event) => {
                        if (
                            (event.code === "Space" ||
                                event.code === "Enter") &&
                            !event.repeat
                        ) {
                            event.preventDefault();
                            startRepeat(-step);
                        }
                    }}
                    onkeyup={(event) => {
                        if (event.code === "Space" || event.code === "Enter") {
                            stopRepeat();
                        }
                    }}
                >
                    −
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    .field {
        display: flex;
        flex-direction: column;
        gap: var(--gap-md);
        width: max-content;
    }

    .label {
        font-size: var(--font-base);
    }

    .input-container {
        display: flex;
        gap: var(--gap-md);
    }

    .input {
        background-color: transparent;
        border: 2px solid var(--text);
        border-radius: var(--radius-md);
        color: var(--text);
        font-size: var(--font-base);
        outline: 2px solid transparent;
        outline-offset: var(--offset-md);
        padding: 8px 10px;
        transition-property: color, border-color;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-timing-function);

        &:hover {
            outline-color: var(--app-color-2);
        }

        &:focus-visible {
            outline-color: var(--app-color);
        }

        &.small {
            text-align: center;
            width: 50px;
        }
    }

    .input-spinners {
        display: flex;
        flex-direction: column;
        gap: var(--gap-sm);
    }

    .number-spinners__increment,
    .number-spinners__decrement {
        background-color: var(--button);
        border: 1px solid var(--text);
        border-radius: var(--radius-sm);
        color: var(--text);
        cursor: pointer;
        font-size: var(--font-sm);
        outline: 2px solid transparent;
        outline-offset: var(--offset-sm);
        transition-property: background-color, border-color, color;
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
    }
</style>
