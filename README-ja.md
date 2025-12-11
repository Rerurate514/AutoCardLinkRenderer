# AutoCardLinkRenderer
## 使い方
これはQuartzのTransformersのプラグインになります。
このPluginを使用するには、以下のコマンドをQuartzプロジェクトのルートディレクトリで実行します。
```shell
npx create-quartz-autocardlinkrenderer@latest
```

このコマンドを実行すると
- `quartz/components/style/autoCardLink.inline.scss`
- `quartz/plugins/transformers/aslr.ts`
にそれぞれファイルが生成されます。

そして、生成された`quartz/plugins/transformers/aslr.ts`を`quartz/plugins/transformers/index.ts`にインポートします。
```ts
export { AutoCardLinkRenderer } from "./aclr"
```

さらに、`quartz.config.ts`の`transformers`セクションにこれを挿入します。
```ts
Plugin.AutoCardLinkRenderer(),
```

これで完成です！！

## 顔たち
- 通常時
<img width="1086" height="181" alt="image" src="https://github.com/user-attachments/assets/1ea1787f-35f6-4a2a-ba73-7d8631285389" />

- hover時
<img width="1085" height="175" alt="image" src="https://github.com/user-attachments/assets/2db9fdf4-2d0b-4c1f-8934-2b4357dab7ac" />
