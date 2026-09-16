## 说明
本项目的定位是一个最小启动的svelte5项目模板

## 快速初始化一个新的项目

#### 克隆模板
把 mini-svelte5 这个仓库当模板, 且不带原仓库的 Git 历史
```bash
pnpm dlx degit Knowckx/mini-svelte5 yourAppName
```

#### git

```bash
# 初始化新的 git 仓库
git init
git add .
git commit -m "Initial commit from template"
# 然后 点击vscode的发布按钮 可以直接推私人库
```

#### 初始化模板
1. 全局搜索并且替换 mini-svelte5
2. 去上层的 pnpm-workspace.yaml 修改，加上新项目路径
```
packages:
  - new-proj-name
```

3. pnpm install
4. 改一下端口 `vite.config.ts`  preview.port


# 启动

```bash
pnpm dev

# 预览生产构建
pnpm pwa
```
