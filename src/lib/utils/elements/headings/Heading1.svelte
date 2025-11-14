<script lang="ts">
    interface Props {
        mainName: string;
        subName?: string;
        playAnimation?: boolean;
        fullScreen?: boolean;
    }

    let {
        mainName,
        subName,
        playAnimation = false,
        fullScreen = false,
    }: Props = $props();

    const LETTER_TIMEOUT_IN_MS = 60;

    let mainNameLetters = $derived(sanitize(mainName));

    let subNameLetters = $derived(subName ? sanitize(subName) : []);

    let mainNameDelays = $derived(randomDelays(mainNameLetters.length));

    let subNameDelays = $derived(randomDelays(subNameLetters.length));

    let numberOfElementsAnimated = $derived(
        Math.max(mainNameLetters.length, subNameLetters?.length || 0),
    );

    function sanitize(text: string): string[] {
        return text.split("").map((c) => (c === " " ? "\u00A0" : c));
    }

    function randomDelays(count: number): number[] {
        const indices = Array.from({ length: count }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices.map((i) => i * LETTER_TIMEOUT_IN_MS);
    }
</script>

<h1 class="heading-1" class:full-screen={fullScreen}>
    <span class="heading-1__main">
        {#if playAnimation}
            {#each mainNameLetters as letter, i}
                <span
                    class="letter animate"
                    style="animation-delay: {mainNameDelays[i]}ms;"
                >
                    {letter}
                </span>
            {/each}
        {:else}
            {mainName}
        {/if}
    </span>

    {#if subName}
        <span
            class="heading-1__middle-bar animate"
            style="animation-duration: {numberOfElementsAnimated *
                LETTER_TIMEOUT_IN_MS}ms;"
        ></span>

        <span class="heading-1__sub">
            {#if playAnimation}
                {#each subNameLetters as letter, i}
                    <span
                        class="letter animate"
                        style="animation-delay: {subNameDelays[i]}ms;"
                    >
                        {letter}
                    </span>
                {/each}
            {:else}
                {subName}
            {/if}
        </span>
    {/if}
</h1>

<style>
    .heading-1 {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: var(--gap-md);
        margin: 0 auto;
        transition: color var(--transition-duration)
            var(--transition-timing-function);
        width: max-content;
    }

    .heading-1__main {
        font-size: var(--font-xl);
        font-weight: 500;
    }

    .heading-1__middle-bar {
        background-color: var(--text);
        content: "";
        height: 2px;
        transition: background-color var(--transition);
        width: 100%;

        &.animate {
            animation-name: growBar;
            animation-fill-mode: forwards;
        }
    }

    .heading-1__sub {
        font-size: var(--font-lg);
        font-weight: normal;
        letter-spacing: 5px;
    }

    .heading-1.full-screen {
        height: calc(100dvh - var(--navbar-height));
        justify-content: center;

        & .heading-1__main {
            font-size: var(--font-xxl);
        }

        & .heading-1__sub {
            font-size: var(--font-xl);
        }
    }

    .letter {
        opacity: 0;

        &.animate {
            animation-duration: var(--transition-duration);
            animation-name: fadeIn;
            animation-fill-mode: forwards;
        }
    }

    @keyframes growBar {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
