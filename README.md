


pnpm run build && pnpm preview --host


yalc remove infa-s5
yalc add infa-s5
pnpm dev

# svelte5 新项目创建过程
pnpm dlx sv create mini-svelte5

安装对shadcn的依赖
pnpm dlx shadcn-svelte@latest init

配置对infa包组件css的集成
src\routes\layout.css 需要手动加一行
/* 手动添加这一行来扫描 infa-s5 的组件 */
@source "../../node_modules/infa-s5/dist";