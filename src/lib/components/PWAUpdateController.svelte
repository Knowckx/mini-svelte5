<script lang="ts">
	import { PWAUpdatePrompt, type PWAUpdateStatus } from '@knowckx/infa-s5';
	import { onDestroy } from 'svelte';
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	let isUpdating = $state(false);
	let updateError = $state('');
	let swRegistration: ServiceWorkerRegistration | undefined;
	let updateCheckTimer: ReturnType<typeof setInterval> | null = null;
	let reloadTimer: ReturnType<typeof setTimeout> | null = null;

	const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW({
		onRegisteredSW: handleRegisteredSW,
		onNeedReload: reloadPage,
		onRegisterError: handleRegisterError
	});

	let status: PWAUpdateStatus = $derived(
		$needRefresh ? (isUpdating ? 'updating' : 'update-ready') : 'offline-ready'
	);

	onDestroy(cleanup);

	// 注册成功后按项目策略定时检查新版本。
	function handleRegisteredSW(_swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) {
		if (!registration) return;

		swRegistration = registration;
		updateCheckTimer = setInterval(checkForUpdate, 60 * 1000);
	}

	// 主动请求 Service Worker 检查更新。
	function checkForUpdate() {
		if (!swRegistration) return;

		void swRegistration.update().catch(handleUpdateCheckError);
	}

	// 输出后台更新检查错误，不打断当前页面。
	function handleUpdateCheckError(error: unknown) {
		console.error('[PWA] SW update check error:', error);
	}

	// 输出 Service Worker 注册错误。
	function handleRegisterError(error: unknown) {
		console.error('[PWA] SW registration error:', error);
	}

	// 清理刷新兜底并重新加载页面。
	function reloadPage() {
		if (reloadTimer) {
			clearTimeout(reloadTimer);
			reloadTimer = null;
		}
		window.location.reload();
	}

	// 关闭当前更新或离线就绪提示。
	function closePrompt() {
		needRefresh.set(false);
		offlineReady.set(false);
	}

	// 应用新版本，并在插件未主动刷新时执行兜底刷新。
	async function handleUpdate() {
		if (isUpdating) return;

		isUpdating = true;
		updateError = '';

		try {
			await updateServiceWorker();
			reloadTimer = setTimeout(reloadPage, 3000);
		} catch (error) {
			isUpdating = false;
			updateError = error instanceof Error ? error.message : '更新失败';
		}
	}

	// 组件销毁时释放全部计时器。
	function cleanup() {
		if (updateCheckTimer) clearInterval(updateCheckTimer);
		if (reloadTimer) clearTimeout(reloadTimer);
	}
</script>

{#if $needRefresh || $offlineReady}
	<PWAUpdatePrompt {status} error={updateError} onUpdate={handleUpdate} onClose={closePrompt} />
{/if}
