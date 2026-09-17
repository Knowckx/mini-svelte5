<script lang="ts">
	import { Bell, House, Plus, Puzzle, User } from '@lucide/svelte';
	import infa from '@knowckx/infa-s5';
	import BottomNavigator, { type Tab } from '@/lib/components/BottomNavigator.svelte';
	import PWAUpdatePrompt from '@/lib/components/PWAUpdatePrompt.svelte';
	import FeaturePage from './pages/FeaturePage.svelte';
	import HomePage from './pages/HomePage.svelte';

	const tabs: Tab[] = [
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

<PWAUpdatePrompt />
<infa.Tip.UI />
<BottomNavigator {tabs} fabIcon={Plus} onFabClick={openPublisher} />
