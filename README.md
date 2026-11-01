# 眠雨 · 作品与文字

个人作品集与博客。纯静态站点，无框架、无构建。

- 线上：https://mianyu-7bao.github.io
- 仓库：https://github.com/mianyu-7bao/mianyu-7bao.github.io

## 页面

| 文件 | 内容 |
|---|---|
| `index.html` | 首页 |
| `works.html` | 作品（项目 / 视觉 / 写作） |
| `blog.html` | 文章列表 |
| `post.html` | 文章阅读页（`?slug=xxx`） |
| `about.html` | 关于 |

## 加一篇文章

1. 在 `content/posts/` 新建 `<slug>.md`，正文**不要**写 `# 标题`（会重复显示）
2. 在 `content/posts/manifest.js` 里加一条 `{slug, title, date, category, excerpt, file}`
3. 提交，等 1~2 分钟

## 本地预览

```
python -m http.server 8123
```

必须用 http 服务，直接双击 html 打开会导致文章页空白（`file://` 下 fetch 被拦截）。

## 给 AI

**`AGENTS.md` 是给 AI 的施工规范**（设计系统红线、目录、常见任务、已知的坑、隐私边界）。让 AI 先读它再动手。
