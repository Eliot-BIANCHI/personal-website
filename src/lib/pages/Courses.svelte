<script lang="ts">
    import Heading1 from "$lib/components/utils/elements/headings/Heading1.svelte";
    import Heading2 from "$lib/components/utils/elements/headings/Heading2.svelte";
    import Heading3 from "$lib/components/utils/elements/headings/Heading3.svelte";
    import { COURSES } from "$lib/components/navigation/links/courses";
    import { NAVBAR } from "$lib/components/navigation/links/navbar";
    import { i18n } from "$lib/i18n.svelte";

    function navigate(url: string) {
        if (url === location.hash) return;
        location.hash = "#" + url;
    }
</script>

<section class="courses-section">
    <Heading1
        mainName={NAVBAR.find((link) => link.href === "/courses")?.name[
            i18n.lang
        ] || ""}
    />

    <ul class="courses">
        {#each COURSES as course}
            <li class="course">
                <Heading2 name={course.name[i18n.lang]} />
                <ul class="sections">
                    {#each course.sections as section}
                        <li class="section">
                            <Heading3 name={section.name[i18n.lang]} />
                            <ul class="chapters">
                                {#each section.chapters as { name, href }}
                                    <li class="chapter">
                                        <a
                                            {href}
                                            onclick={(event) => {
                                                event.preventDefault();
                                                navigate(href);
                                            }}>{name[i18n.lang]}</a
                                        >
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
</section>

<style>
    .courses-section {
        padding-top: 50px;
    }

    .courses,
    .sections,
    .chapters {
        list-style: none;
        margin-block: 0;
        padding-left: 0;
    }

    .courses {
        display: flex;
        flex-direction: column;
        gap: var(--gap-xxl);
        padding-left: 30px;
    }

    .sections {
        display: flex;
        flex-direction: column;
        gap: var(--gap-lg);
    }

    .chapters {
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap-lg);
    }

    .course {
        display: flex;
        flex-direction: column;
        gap: var(--gap-base);
        position: relative;

        &:not(:last-child)::after {
            background-color: var(--text);
            content: "";
            height: 2px;
            position: absolute;
            bottom: calc(var(--gap-xxl) / 2 * -1);
            left: 50%;
            transition: background-color var(--transition);
            translate: -50% -50%;
            width: 80%;
        }
    }

    .section {
        display: flex;
        flex-direction: column;
        gap: var(--gap-md);
    }

    .chapter > a {
        color: var(--text);
        font-size: var(--font-base);
        padding-left: 20px;
        position: relative;
        transition: color var(--transition);

        &::before {
            aspect-ratio: 1 / 1;
            background-color: var(--text);
            border-radius: 50%;
            content: "";
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 0;
            transition: background-color var(--transition);
            translate: 0 -50%;
            width: 7px;
        }
    }
</style>
