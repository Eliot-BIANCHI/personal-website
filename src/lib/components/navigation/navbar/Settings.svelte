<script lang="ts">
    import Heading3 from "$lib/components/utils/elements/headings/Heading3.svelte";
    import Button from "$lib/components/utils/elements/Button.svelte";
    import Toggle from "$lib/components/utils/elements/Toggle.svelte";

    import LOCAL_STORAGE from "$lib/storages/local.json";
    import { app } from "$lib/App.svelte";

    let dialog: HTMLDialogElement;

    let opened = $state(false);

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
</script>

<Button
    iconName="settings"
    onclick={() => (opened = true)}
    classes={{ round: true }}
/>

<dialog bind:this={dialog} onclose={() => (opened = false)} {onpointerdown}>
    <Button
        iconName="cross"
        onclick={() => (opened = false)}
        classes={{
            round: true,
            position: "absolute",
            positioned: { top: 10, right: 20 },
        }}
    />

    <Heading3 name="Paramètres" />

    <ul class="settings">
        <li class="setting">
            <Toggle
                label="Assistant?"
                name="assistant"
                checked={app.assistant}
                onchange={() => app.toggleAssistant()}
            />
        </li>
    </ul>
</dialog>

<style>
    dialog {
        background-color: var(--bg-primary);
        border: none;
        border-radius: var(--radius-md);
        max-width: 700px;
        min-width: 300px;
        transition: background-color var(--transition);
        width: 50dvw;
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
