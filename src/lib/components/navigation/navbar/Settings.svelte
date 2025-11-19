<script lang="ts">
    import Heading3 from "$lib/components/utils/elements/headings/Heading3.svelte";
    import Button from "$lib/components/utils/elements/Button.svelte";
    import Toggle from "$lib/components/utils/elements/fields/Toggle.svelte";
    import Select from "$lib/components/utils/elements/fields/Select.svelte";

    import { app } from "$lib/App.svelte";
    import { i18n } from "$lib/i18n.svelte";
    import type { Language } from "$lib/types";
    import type { SelectOption } from "$lib/components/utils/elements/fields/types";
    import LOCAL_STORAGE from "$lib/storages/local.json";

    let dialog: HTMLDialogElement;

    let opened = $state(false);

    let languageSelected = $state(
        localStorage.getItem(
            LOCAL_STORAGE.SETTINGS.LANGUAGE || "en",
        ) as Language,
    );

    const languages: SelectOption[] = [
        {
            iconName: "flag--english",
            text: i18n.t.navbar.settings.field1.values.english,
            value: "en",
        },
        {
            iconName: "flag--french",
            text: i18n.t.navbar.settings.field1.values.french,
            value: "fr",
        },
    ];

    $effect(() => {
        if (opened) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    });

    function onpointerdown(e: PointerEvent) {
        e.stopPropagation();
        const dialogDimensions = dialog.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            opened = false;
        }
    }

    const browserImplementsSpeechRecognition =
        //@ts-ignore
        window.SpeechRecognition !== undefined;

    function changeLanguage(language: string) {
        i18n.load(language as Language);
        languageSelected = language as Language;
        localStorage.setItem(LOCAL_STORAGE.SETTINGS.LANGUAGE, language);
    }
</script>

<Button
    iconName="settings"
    onclick={() => (opened = true)}
    classes={{ round: true }}
/>

<dialog
    class="dialog"
    bind:this={dialog}
    onclose={() => (opened = false)}
    {onpointerdown}
>
    <Button
        iconName="cross"
        onclick={() => (opened = false)}
        classes={{
            round: true,
            position: "absolute",
            positioned: { top: 10, right: 20 },
        }}
    />

    <Heading3 name={i18n.t.navbar.settings.title} />

    <ul class="settings">
        <li class="setting">
            <Select
                label={i18n.t.navbar.settings.field1.name}
                name="language"
                options={languages.map(({ iconName, text, value }) => ({
                    iconName,
                    text,
                    value,
                    selected: languageSelected === value,
                }))}
                onchange={changeLanguage}
            />
        </li>
        {#if browserImplementsSpeechRecognition}
            <li class="setting">
                <Toggle
                    label={i18n.t.navbar.settings.field2.name}
                    name="assistant"
                    checked={app.assistant}
                    onchange={() => app.toggleAssistant()}
                />
            </li>
        {/if}
    </ul>
</dialog>

<style>
    .dialog {
        background-color: var(--bg-primary);
        border: none;
        border-radius: var(--radius-md);
        max-width: 700px;
        min-width: 300px;
        outline: 2px solid transparent;
        outline-offset: var(--offset-md);
        transition: background-color var(--transition);
        width: 50dvw;

        &:focus-visible {
            outline-color: var(--app-color);
        }
    }

    .settings {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin-block: 0;
        padding-left: 0;
    }

    .setting {
        padding: 30px 15px;
        position: relative;

        &:not(:last-child)::after {
            background-color: var(--text);
            content: "";
            height: 1px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transition: background-color var(--transition);
            translate: -50%;
            width: 85%;
        }
    }
</style>
