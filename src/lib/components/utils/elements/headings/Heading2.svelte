<script lang="ts">
    interface Props {
        name: string;
    }

    let { name }: Props = $props();
</script>

<h2 class="heading-2">{name}</h2>

<style>
    .heading-2 {
        font-size: var(--font-lg);
        font-weight: 500;
        margin-block: 0;
        transition: color var(--transition);
    }
</style>
