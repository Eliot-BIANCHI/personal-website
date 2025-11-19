<script lang="ts">
    import Theme from "./navbar/Theme.svelte";
    import Settings from "./navbar/Settings.svelte";
    import Assistant from "./navbar/Assistant.svelte";
    import Icon from "$lib/components/utils/elements/Icon.svelte";
    import Button from "$lib/components/utils/elements/Button.svelte";
    import LOCAL_STORAGE from "$lib/storages/local.json";
    import { LINKS } from "./types";
    import { app } from "$lib/App.svelte";
    import { i18n } from "$lib/i18n.svelte";

    const HIDE_NAVBAR_Y_SCROLL = 80;

    let hash = $state(location.hash);
    let index = $derived(
        LINKS.findIndex((link) => hash === "" || "#" + link.href === hash),
    );

    let hidden = $state(false);
    let lastScrollY = $state(window.scrollY);

    let opened = $state(
        localStorage.getItem(LOCAL_STORAGE.NAVBAR.OPENED) === "true" || false,
    );

    function onhashchange() {
        hash = location.hash;
    }

    let ignoreFirstScroll =
        localStorage.getItem(LOCAL_STORAGE.NAVBAR.IGNORE_FIRST_SCROLL) ===
            "true" || false;

    function onscroll() {
        if (ignoreFirstScroll) {
            ignoreFirstScroll = false;
            return;
        }

        const currentY = window.scrollY;

        if (currentY < lastScrollY) {
            hidden = false;
        } else {
            if (currentY > HIDE_NAVBAR_Y_SCROLL) hidden = true;
            localStorage.setItem(
                LOCAL_STORAGE.NAVBAR.IGNORE_FIRST_SCROLL,
                "true",
            );
        }

        lastScrollY = currentY;
    }

    function navigate(url: string) {
        lastScrollY = 0;
        opened = false;
        localStorage.setItem(LOCAL_STORAGE.NAVBAR.OPENED, "false");

        if (url === location.hash) return;
        location.hash = "#" + url;
    }
</script>

<svelte:window {onhashchange} {onscroll} />

<nav class="navbar" class:hidden>
    <Button
        iconName={opened ? "cross" : "menu"}
        onclick={() => {
            opened = !opened;
            localStorage.setItem(
                LOCAL_STORAGE.NAVBAR.OPENED,
                opened.toString(),
            );
        }}
        classes={{ hide: { above1024: true } }}
    />

    <ul class="navbar__links" class:opened>
        {#each LINKS as { href, name, iconName }}
            <li class="navbar__link">
                <a
                    class="link"
                    {href}
                    onclick={(event) => {
                        event.preventDefault();
                        navigate(href);
                    }}
                >
                    <Icon name={iconName} />
                    {i18n.t.navbar.links[name]}
                </a>
            </li>
        {/each}
    </ul>

    <ul class="navbar__links-overviews" style="--index: {index};">
        <li class="navbar__not-found">
            <Icon name="navbar--not-found" />
        </li>
        {#each LINKS as { href, name, iconName }}
            <li class="navbar__link-overview">
                <a
                    class="link-overview"
                    {href}
                    data-name={i18n.t.navbar.links[name]}
                    onclick={(event) => {
                        event.preventDefault();
                        navigate(href);
                    }}
                >
                    <span class="link-overview__icon-container">
                        <Icon name={iconName} />
                    </span>
                </a>
            </li>
        {/each}
    </ul>

    <div class="navbar__utils">
        <Theme />

        <Settings />

        {#if app.assistant}
            <Assistant />
        {/if}
    </div>
</nav>

<style>
    .navbar {
        --svg-size: 30px;
        --padding: 20px;
        --link-size: calc(var(--svg-size) + var(--padding));
        background-color: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: var(--navbar-height);
        position: sticky;
        top: 0;
        transition-property: background-color, transform;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-timing-function);
        z-index: 1000;

        &.hidden {
            transform: translateY(-100%);
            transition: transform var(--transition);
        }
    }

    .navbar__links {
        background-color: var(--bg-tertiary);
        display: none;
        flex-direction: column;
        position: fixed;
        top: var(--navbar-height);
        left: 0;
        height: calc(100dvh - var(--navbar-height));
        list-style: none;
        margin-block: 0;
        padding-left: 0;
        transition: background-color var(--transition);
        width: 100dvw;

        &.opened {
            display: flex;
        }
    }

    .link {
        color: var(--text);
        display: flex;
        align-items: center;
        gap: var(--gap-md);
        outline: 2px solid transparent;
        outline-offset: -6px;
        padding: 10px 30px;
        text-decoration: none;
        transition-property: background-color, color, opacity;
        transition-duration: var(--transition-duration);
        transition-timing-function: var(--transition-timing-function);

        &:hover {
            opacity: 0.5;
        }

        &:focus-visible {
            outline-color: var(--app-color);
        }
    }

    .navbar__link:nth-child(odd) > .link {
        background-color: var(--button);
    }

    .navbar__link:nth-child(even) > .link {
        background-color: var(--button-strong);
    }

    .navbar__links-overviews {
        display: flex;
        gap: var(--gap-xl);
        list-style: none;
        margin-block: 0;
        padding-left: 0;
        position: relative;

        &::before {
            aspect-ratio: 1 / 1;
            background-color: var(--app-color-strong);
            border-radius: 50%;
            content: "";
            display: inline-block;
            height: var(--link-size);
            position: absolute;
            top: 50%;
            left: calc((var(--link-size) + var(--gap-xl)) * var(--index));
            transition: left var(--transition);
            translate: 0 -50%;
        }
    }

    .link-overview {
        border-radius: var(--radius-md);
        color: var(--text);
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        font-size: var(--font-base);
        height: var(--navbar-height);
        outline: 2px solid transparent;
        outline-offset: -4px;
        position: relative;
        text-decoration: none;
        transition: color var(--transition);
        width: var(--link-size);

        &:focus-visible {
            outline-color: var(--app-color);
        }

        & .link-overview__icon-container {
            position: relative;
            bottom: 0;
            transition: bottom var(--transition);
        }

        &::before {
            content: attr(data-name);
            display: inline-block;
            font-size: var(--font-sm);
            opacity: 0;
            position: absolute;
            bottom: 5px;
            left: 50%;
            transition: opacity var(--transition);
            translate: -50%;
            width: max-content;
        }

        &:hover {
            & .link-overview__icon-container {
                bottom: 15px;
            }

            &::before {
                opacity: 1;
            }
        }
    }

    .navbar__not-found {
        position: absolute;
        top: 50%;
        left: calc(
            (var(--link-size) + var(--gap-xl)) * -1 + var(--padding) / 2
        );
        translate: 0 -50%;
    }

    .navbar__utils {
        display: flex;
        align-items: center;
        gap: var(--gap-lg);
    }

    @media all and (width >= 1024px) {
        .navbar__links {
            display: none !important;
        }
    }

    @media all and (width < 1024px) {
        .navbar__links-overviews {
            display: none;
        }
    }
</style>
