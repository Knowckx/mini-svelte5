<script lang="ts">
	import infa from '@knowckx/infa-s5';

	console.log(`Infa 版本 ${infa.version}`);
</script>

<main class="p-8">
	<h1>Infa 版本 {infa.version}</h1>
	<infa.Button
		onclick={() => {
			infa.Tip.success(`Infa 版本 ${infa.version}`);
		}}
	>
		点击提示
	</infa.Button>

	<infa.Button
		variant="danger"
		class="ml-4"
		onclick={() => {
			infa.Tip.error('出错了！');
		}}
	>
		错误提示
	</infa.Button>

	<infa.Button
		variant="secondary"
		class="ml-4"
		onclick={() => {
			infa.Tip.info('这是一条消息');
		}}
	>
		普通提示
	</infa.Button>
</main>
