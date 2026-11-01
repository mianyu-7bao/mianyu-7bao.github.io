# AGENTS.md — 给接手这个项目的 AI

> 你是被叫来改这个个人博客的 AI。读完这份文件再动手，能省掉 80% 的返工。
> 人看的版本是 `README.md`；这份是给 AI 的施工规范。

---

## 1. 这是什么

眠雨（网名，**不要写本名**）的个人作品集 + 博客，纯静态站点。

- 线上：https://mianyu-7bao.github.io
- 仓库：https://github.com/mianyu-7bao/mianyu-7bao.github.io （公开仓库）
- 托管：GitHub Pages，`main` 分支根目录直接发布
- 推送 `main` 后 1~2 分钟自动生效

**技术栈：纯手写 HTML + CSS + 原生 JS。没有任何框架、没有构建步骤、没有 npm、没有 package.json。**
不要引入 React / Vue / Tailwind / 打包工具。不要"顺手升级技术栈"。

---

## 2. 硬约束：设计系统不许改

视觉依据是眠雨自己的风格档案 `E:\777mianyu-style`（本地）。以下是**不能擅自改动**的：

### 配色（唯一强调色原则）

| 用途 | 日间(light) | 深夜(dark) |
|---|---|---|
| 背景 | `#F4F5F7` | `#141414` |
| 卡片 | `#FFFFFF` | `#202020` |
| 正文 | `#1A1D24` | `#E6E8EC` |
| 次要文字 | `#6B7280` | `#9AA1AD` |
| **强调色（全站唯一）** | `#E0526D` | `#FF8FA3` |

- 强调色**只有玫瑰粉**。加第二种高饱和色 = 破坏风格。
- 不用纯黑 `#000`、不用纯白 `#FFF` 做页面底色。
- 全部通过 CSS 变量取色（`var(--accent)` 等），**禁止在页面里写死十六进制颜色**。

### 主题

- 日/夜两套，必须**手动可切换**（右上角 `.theme-toggle`），不能只跟随系统。
- 状态存在 `localStorage` 的 `theme` 键，值是 `light` / `dark`。
- CSS 里三处都要同步维护：`:root`（默认=浅色）、`@media (prefers-color-scheme: dark)`、`[data-theme="dark"]`、`[data-theme="light"]`。**加新变量时四个地方都要加**，少一个就会出现"某个主题下颜色不对"。

### 版式

- 字重只有 `300`（正文）和 `500`（标题/强调），**没有 600/700**。
- 中文行高 `1.85`，标题行高 `1.22`，标题字距 `-0.02em`。
- 左对齐不对称（`.asym`，`margin-right:auto`），**不要居中排版、不要满屏卡片墙**。
- 靠**明度分层**做层级，**不用 box-shadow**。
- 唯一柔和光效是 `body::before` 那团玫瑰粉柔焦光斑（`filter: blur(90px)`，`z-index:-1`）。

### 明确禁止

玻璃拟态（backdrop-filter 磨砂卡）、霓虹发光、高饱和撞色、渐变按钮、圆角超过 `14px`、阴影卡片、电商风、动效超过 `0.45s`、`!important` 满天飞。

---

## 3. 目录结构

```
/
├── index.html          首页（hero + 精选 3 卡）
├── works.html          作品页（按「项目 / 视觉 / 写作」分组）
├── blog.html           文章列表（读 window.POSTS 生成）
├── post.html           文章阅读页（?slug=xxx，用 marked.js 渲染 md）
├── about.html          关于页
├── README.md           给人看的简介
├── AGENTS.md           本文件
├── assets/
│   ├── css/style.css   全站唯一样式表（含主题变量）
│   ├── js/theme.js     日/夜切换（每个页面底部都引用）
│   ├── vendor/marked.min.js   Markdown 渲染库（本地，不依赖 CDN）
│   ├── downloads/AppleMusicLyrics.exe  作品的下载文件
│   └── img/            图片放这里（目前为空）
└── content/posts/
    ├── manifest.js     文章清单 window.POSTS（手写数组）
    ├── hello.md
    └── study-year1.md
```

页面之间靠相对路径互相引用，**都放在根目录**，不要建子目录搞多级。

---

## 4. 常见任务怎么做

### 4.1 加一篇文章（最常见）

两步，缺一不可：

**① 新建 `content/posts/<slug>.md`**
- 文件名用英文小写 + 连字符，比如 `first-month.md`
- **正文第一行不要写 `# 标题`** —— 标题由列表页/阅读页渲染，写了会重复显示两次（这个坑已经踩过）
- 直接用 `##` 做小节标题
- 支持 `**粗体**`、`> 引用`、`- 列表`、`1. 有序`、`` `行内代码` ``、代码块

**② 在 `content/posts/manifest.js` 的数组里加一条**

```js
{
  slug: "first-month",              // 必须和文件名一致（不含 .md）
  title: "开学第一个月",
  date: "2026-11-01",               // YYYY-MM-DD，列表按这个倒序排
  category: "随笔",                  // 随笔 / 学习 / 日常，自由起
  excerpt: "一句话摘要，列表页显示。",
  file: "content/posts/first-month.md"
}
```

注意最后一条后面**不要留逗号**（JS 数组最后一项带逗号虽然合法，但保持整洁）。

### 4.2 加一个作品

改 `works.html`，复制一张卡的结构：

```html
<article class="card">
  <span class="chip chip-tech">项目</span>   <!-- chip-tech / chip-visual / chip-writing -->
  <h3>作品名</h3>
  <p class="desc">一到两句说明，别写成广告。</p>
  <span class="meta">2026 · 类型</span>
  <a href="链接或 assets/downloads/文件.exe" class="more">查看 →</a>
</article>
```

- 外链加 `target="_blank" rel="noopener"`
- 下载文件放 `assets/downloads/`，用相对路径引用
- 首页 `index.html` 的「精选」区也有 3 张卡，需要的话同步改（首页只放 3 个，别塞满）

### 4.3 改文案

改文案只碰 `<body>` 里的文字，**不要动结构、不要动 class**。改完不用碰 CSS。

- 站名/署名：所有页面 `.brand` 和 `<title>`
- 一句话介绍：`index.html` 的 `<p class="lead">`
- 关于页正文：`about.html` 的 `.about-grid`

### 4.4 换配色（谨慎）

只改 `style.css` 顶部那四组变量。改完后必须同时检查日/夜两套，并且确认对比度够（正文对背景至少 4.5:1）。

**换掉玫瑰粉 = 换掉这个人的个人识别色**，动手前先问。

### 4.5 加新页面

1. 复制 `about.html` 当骨架（它有 nav + section + footer）
2. `<title>` 改成新页面名
3. 在**所有**页面的 `.nav-links` 里加链接（5 个页面都要加，否则导航不一致）
4. 底部引用 `assets/js/theme.js`

---

## 5. 已知的坑（踩过，别再踩）

1. **文章重复标题**：`.md` 里写 `# 标题` 会和页面标题重复。正文从 `##` 开始。
2. **中文路径传参乱码**：在 Windows 上通过命令行工具处理含中文的路径会乱码。如果要脚本化操作，先把文件复制到 `C:\Users\31153\AppData\Local\Temp\` 这种纯英文路径再处理。
3. **PowerShell 引号**：内联长命令的引号容易被吃掉，改写脚本文件再执行。
4. **上传漏文件**：用网页拖拽上传时，`content/posts/` 里的小文件容易被漏掉（曾经漏过一篇），传完必须逐个核对线上是否存在。
5. **缓存**：GitHub Pages 有 CDN 缓存，刚提交可能还是旧内容。验证时 URL 后面加 `?v=随机数` 绕过缓存。
6. **下划线开头的文件/目录**会被 Jekyll 忽略、不发布。需要"存着但不上线"的东西放 `_` 开头。
7. **不要引外部 CDN**：`marked.min.js` 已经放本地了。眠雨的网络环境不稳（需要代理），外部依赖随时可能加载失败。

---

## 6. 本地预览

```powershell
# 在博客根目录执行，然后浏览器打开 http://127.0.0.1:8123
python -m http.server 8123
```

**必须用 http 服务预览，不能直接双击 html 打开**——`file://` 协议下 `fetch` 读 md 会被浏览器拦截，文章页会空白。

---

## 7. 发布

两种方式，都是推 `main` 分支：

- **网页端（眠雨自己用这个）**：仓库 → Add file → Upload files → 拖文件 → Commit changes
- **命令行（有 git 的环境）**：`git add . && git commit -m "说明" && git push`

推完等 1~2 分钟，访问 https://mianyu-7bao.github.io 验证。

**验证清单**（改完必过）：
- 首页 / works / blog / about 四个页面都能打开
- 文章列表能点进每一篇，正文不空白
- 日/夜切换生效且刷新后保持
- 手机宽度（375px）下不横向滚动

---

## 8. 隐私边界

- 署名只用 **眠雨**。真名、学号、身份证、密码、验证码——**任何情况下不写进这个仓库**（仓库是公开的）。
- 关于页现在公开了「广州职业技术大学 · 建筑工程学院 · 26 智能建造工程本科 1 班」。这是眠雨本人确认可以公开的，**但不要再往上加更细的信息**（宿舍、课表、手机号）。
- 邮箱目前没放。要加先问。
- 这个仓库是**公开**的：任何文件、任何注释、任何 commit message 都会被人看到。写 commit message 时别带隐私。

---

## 9. 沟通方式

眠雨是大一学生，非计算机专业。改完东西**用大白话讲清楚改了什么、影响什么、怎么撤回**，不要甩术语。他要"结论先行"，先给判断再给理由。

不确定的事先问，别自己发明需求。
