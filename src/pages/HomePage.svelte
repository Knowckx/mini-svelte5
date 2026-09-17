<script lang="ts">
	import { Menu, Search } from '@lucide/svelte';
	import infa from '@knowckx/infa-s5';

	const topTabs = ['关注', '发现', '本地'];

	let activeTopTab = $state('关注');

	console.log(`Infa 版本 ${infa.version}`);

	function selectTopTab(event: MouseEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		const tab = button.dataset.tab;
		if (!tab) return;

		activeTopTab = tab;
	}

	function showSuccess() {
		infa.Tip.success(`Infa 版本 ${infa.version}`);
	}

	function showError() {
		infa.Tip.error('出错了！');
	}

	function showInfo() {
		infa.Tip.info('这是一条消息');
	}
</script>

<div class="flex h-full min-h-0 flex-col">
	<header class="shrink-0 border-b bg-background">
		<div class="grid h-14 grid-cols-[48px_1fr_48px] items-center px-2">
			<button type="button" class="flex size-10 items-center justify-center rounded-full" aria-label="打开菜单">
				<Menu size={22} />
			</button>

			<nav class="flex items-center justify-center gap-5" aria-label="首页分类">
				{#each topTabs as tab (tab)}
					<button
						type="button"
						data-tab={tab}
						class="relative h-14 text-sm text-muted-foreground"
						class:font-semibold={activeTopTab === tab}
						class:text-foreground={activeTopTab === tab}
						onclick={selectTopTab}
					>
						{tab}
						{#if activeTopTab === tab}
							<span class="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-primary"></span>
						{/if}
					</button>
				{/each}
			</nav>

			<button type="button" class="flex size-10 items-center justify-center rounded-full" aria-label="搜索">
				<Search size={22} />
			</button>
		</div>
	</header>

	<main class="min-h-0 flex-1 overflow-y-auto p-6">
		<div class="mx-auto max-w-lg">
			<p class="text-sm text-muted-foreground">当前频道：{activeTopTab}</p>
			<h1 class="mt-2 text-2xl font-semibold">Infa 版本 {infa.version}</h1>

			<div class="mt-6 flex flex-wrap gap-3">
				<infa.Button onclick={showSuccess}>点击提示</infa.Button>
				<infa.Button variant="danger" onclick={showError}>错误提示</infa.Button>
				<infa.Button variant="secondary" onclick={showInfo}>普通提示</infa.Button>
			</div>
		</div>
	</main>
</div>
