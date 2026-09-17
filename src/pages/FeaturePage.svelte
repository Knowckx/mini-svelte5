<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div class="flex h-full min-h-0 flex-col">
	<main class="min-h-0 flex-1 overflow-y-auto p-6">
		<div class="mx-auto max-w-lg rounded-xl border bg-background p-6 shadow-sm">
			<p class="text-sm text-muted-foreground">功能页面</p>
			<h1 class="mt-2 text-2xl font-semibold">{title}</h1>
			<p class="mt-3 text-muted-foreground">{description}</p>
		</div>
	</main>
</div>
