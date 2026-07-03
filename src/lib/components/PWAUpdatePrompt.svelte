<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW({
		onRegisteredSW(_swScriptUrl, registration) {
			if (!registration) return;

			setInterval(() => {
				registration.update();
			}, 60 * 1000);
		},
		onRegisterError(error) {
			console.error('[PWA] SW registration error:', error);
		}
	});

	function closePrompt() {
		needRefresh.set(false);
		offlineReady.set(false);
	}

	async function handleUpdate() {
		await updateServiceWorker(true);
	}
</script>

{#if $needRefresh || $offlineReady}
	<div class="fixed right-5 bottom-5 z-50 flex max-w-80 flex-col gap-3 rounded-lg border bg-background p-4 text-foreground shadow-lg">
		<div>
			<p class="text-sm font-medium">
				{$needRefresh ? '发现新版本' : '已可离线使用'}
			</p>
			<p class="mt-1 text-sm text-muted-foreground">
				{$needRefresh ? '点击更新后会刷新页面。' : '核心资源已缓存。'}
			</p>
		</div>

		<div class="flex gap-2">
			{#if $needRefresh}
				<button class="rounded bg-primary px-3 py-2 text-sm text-primary-foreground" onclick={handleUpdate}>
					立即更新
				</button>
			{/if}
			<button class="rounded border px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground" onclick={closePrompt}>
				关闭
			</button>
		</div>
	</div>
{/if}
