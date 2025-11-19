<script lang="ts">
    import Heading1 from "$lib/components/utils/elements/headings/Heading1.svelte";
    import Paragraph from "$lib/components/utils/elements/Paragraph.svelte";
    import Diagonal from "$lib/components/utils/shapes/Diagonal.svelte";

    import src from "$assets/images/suit.jpeg";
    import { i18n } from "$lib/i18n.svelte";
</script>

<div class="routing">
    <Heading1
        mainName={i18n.t.pages.home.title}
        subName="Eliot BIANCHI"
        playAnimation
        fullScreen
    />

    <Diagonal>
        <div class="profile-section">
            <Paragraph>{i18n.t.pages.home.presentation}</Paragraph>
            <img class="profile-section__picture" {src} alt="Profil" />
        </div>
    </Diagonal>
</div>

<style>
    .profile-section {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .profile-section__picture {
        border-radius: 99px;
    }
</style>
