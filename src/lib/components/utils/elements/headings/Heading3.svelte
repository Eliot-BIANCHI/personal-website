<script lang="ts">
    interface Props {
        name: string;
    }

    let { name }: Props = $props();
</script>

<h2 class="heading-3">{name}</h2>

<style>
    .heading-3 {
        font-size: var(--font-md);
        font-weight: 500;
        margin-block: 0;
        transition: color var(--transition);
    }
</style>
