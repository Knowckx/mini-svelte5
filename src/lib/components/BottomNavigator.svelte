<script module lang="ts">
	import type { Component } from 'svelte';

	// 外部可修改 activeLabel，直接切换底部导航页面。
	export const bottomNavigationState = $state({
		activeLabel: ''
	});

	export interface Tab {
		label: string;
		component: Component<any>;
		icon?: Component;
		props?: Record<string, unknown>;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		tabs: Tab[];
		fabIcon: Component;
		onFabClick: () => void;
		fabLabel?: string;
	}

	const bottomActiveLabelKey = 'Key-Bottom-ActiveLabel';

	let { tabs, fabIcon: FabIcon, onFabClick, fabLabel = '发布' }: Props = $props();
	let initialized = $state(false);
	let activeTab = $derived(tabs.find((tab) => tab.label === bottomNavigationState.activeLabel));
	let activeProps = $derived(activeTab?.props ?? {});

	onMount(initializeNavigation);

	$effect(() => {
		if (!initialized || tabs.length === 0) return;

		const activeLabel = bottomNavigationState.activeLabel;
		if (!tabs.some((tab) => tab.label === activeLabel)) {
			bottomNavigationState.activeLabel = tabs[0].label;
			return;
		}

		localStorage.setItem(bottomActiveLabelKey, activeLabel);
	});

	// 优先恢复当前有效状态，其次恢复缓存，最后选中首个页面。
	function initializeNavigation() {
		if (tabs.length === 0) {
			initialized = true;
			return;
		}

		const activeLabel = bottomNavigationState.activeLabel;
		if (tabs.some((tab) => tab.label === activeLabel)) {
			initialized = true;
			return;
		}

		const cachedLabel = localStorage.getItem(bottomActiveLabelKey);
		bottomNavigationState.activeLabel = tabs.some((tab) => tab.label === cachedLabel) ? cachedLabel! : tabs[0].label;
		initialized = true;
	}

	// 从按钮数据中读取目标页面，避免为列表项创建闭包。
	function selectTab(event: MouseEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		const label = button.dataset.label;
		if (!label) return;

		bottomNavigationState.activeLabel = label;
	}
</script>

<div class="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
	<div class="min-h-0 flex-1 overflow-hidden">
		{#if activeTab}
			{@const ActiveComponent = activeTab.component}
			<ActiveComponent {...activeProps} />
		{:else}
			<div class="flex h-full items-center justify-center text-sm text-muted-foreground">暂无可用页面</div>
		{/if}
	</div>

	<footer class="shrink-0 border-t bg-background pb-[env(safe-area-inset-bottom)]">
		<nav class="grid h-18 grid-cols-5 items-center" aria-label="主导航">
			{#each tabs.slice(0, 2) as tab (tab.label)}
				<button
					type="button"
					data-label={tab.label}
					class="flex h-full flex-col items-center justify-center gap-1 text-xs"
					class:font-semibold={bottomNavigationState.activeLabel === tab.label}
					class:text-primary={bottomNavigationState.activeLabel === tab.label}
					class:text-muted-foreground={bottomNavigationState.activeLabel !== tab.label}
					aria-current={bottomNavigationState.activeLabel === tab.label ? 'page' : undefined}
					onclick={selectTab}
				>
					{#if tab.icon}
						{@const Icon = tab.icon}
						<Icon size={24} />
					{/if}
					<span>{tab.label}</span>
				</button>
			{/each}

			<button
				type="button"
				class="mx-auto flex size-14 -translate-y-3 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
				aria-label={fabLabel}
				onclick={onFabClick}
			>
				<FabIcon size={28} />
			</button>

			{#each tabs.slice(2, 4) as tab (tab.label)}
				<button
					type="button"
					data-label={tab.label}
					class="flex h-full flex-col items-center justify-center gap-1 text-xs"
					class:font-semibold={bottomNavigationState.activeLabel === tab.label}
					class:text-primary={bottomNavigationState.activeLabel === tab.label}
					class:text-muted-foreground={bottomNavigationState.activeLabel !== tab.label}
					aria-current={bottomNavigationState.activeLabel === tab.label ? 'page' : undefined}
					onclick={selectTab}
				>
					{#if tab.icon}
						{@const Icon = tab.icon}
						<Icon size={24} />
					{/if}
					<span>{tab.label}</span>
				</button>
			{/each}
		</nav>
	</footer>
</div>
