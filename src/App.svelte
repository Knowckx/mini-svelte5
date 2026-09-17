<script lang="ts">
	import { Bell, House, Plus, Puzzle, User } from '@lucide/svelte';
	import infa, { BottomNavigator, type BottomNavigationTab } from '@knowckx/infa-s5';
	import PWAUpdateController from '@/lib/components/PWAUpdateController.svelte';
	import FeaturePage from './pages/FeaturePage.svelte';
	import HomePage from './pages/HomePage.svelte';

	const tabs: BottomNavigationTab[] = [
		{
			label: '首页',
			component: HomePage,
			icon: House
		},
		{
			label: '功能1',
			component: FeaturePage,
			icon: Puzzle,
			props: { title: '功能1', description: '这里承载第一个业务功能。' }
		},
		{
			label: '功能2',
			component: FeaturePage,
			icon: Bell,
			props: { title: '功能2', description: '这里承载第二个业务功能。' }
		},
		{
			label: '功能3',
			component: FeaturePage,
			icon: User,
			props: { title: '功能3', description: '这里承载第三个业务功能。' }
		}
	];

	function openPublisher() {
		infa.Tip.info('发布功能待实现');
	}
</script>

<PWAUpdateController />
<infa.Tip.UI />
<BottomNavigator {tabs} fabIcon={Plus} onFabClick={openPublisher} />
