# AutoCardLinkRenderer

## Usage

This is a Transformers plugin for Quartz.

To use this plugin, run the following command in the root directory of your Quartz project:

```shell
npx create-quartz-autocardlinkrenderer@latest
```

Running this command will generate files at:
- `quartz/components/style/autoCardLink.inline.scss`
- `quartz/plugins/transformers/aslr.ts`

Then, import the generated `quartz/plugins/transformers/aslr.ts` in `quartz/plugins/transformers/index.ts`:

```ts
export { AutoCardLinkRenderer } from "./aclr"
```

Additionally, insert this into the `transformers` section of `quartz.config.ts`:

```ts
Plugin.AutoCardLinkRenderer(),
```

That's it!!

## Appearance

- Normal state
<img width="1086" height="181" alt="image" src="https://github.com/user-attachments/assets/1ea1787f-35f6-4a2a-ba73-7d8631285389" />

- On hover
<img width="1085" height="175" alt="image" src="https://github.com/user-attachments/assets/2db9fdf4-2d0b-4c1f-8934-2b4357dab7ac" />
