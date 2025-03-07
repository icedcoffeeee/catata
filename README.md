# catata

> [!NOTE]
> currently in alpha.

local android note-planner app based on [Ryder Carroll bullet
journaling](https://www.youtube.com/watch?v=GfRf43JTqY4) method.

### screenshots:
might be outdated.

<p float="left">
    <img width="30%" src="./assets/screenshots/ss1.png">
    <img width="30%" src="./assets/screenshots/ss2.png">
    <img width="30%" src="./assets/screenshots/ss3.png">
    <img width="30%" src="./assets/screenshots/ss4.png">
    <img width="30%" src="./assets/screenshots/ss5.png">
</p>

## TODO
for beta release.

- working search bar.
- working light mode.
    - streamline colors module.
- changeable start of week and year (e.g. start of semester).

## known issues

- `NoteModal` rerenders text input on change.

## building

```
bunx expo prebuild -p android
cd android
./gradlew assemble
```

## working dir

```
src/
├── app
│   ├── _layout.tsx
│   ├── settings.tsx
│   ├── (tabs)
│   │   └ ...
│   └── [year-month].tsx  // month page for arb year
├── components
│   ├── icons.tsx
│   ├── index.tsx
│   ├── note-list.tsx     // the atomic block
│   └── note-modal.tsx    // the editing modal
├── db
│   ├── index.ts          // database functions
│   └── schema.ts
├── drizzle               // drizzle migrations
│   └ ...
├── colors.ts             // colorschemes
├── styles.ts             // globalstyles
└── utils.ts              // convenience functions
app.json                  // app config
eas.json                  // eas config
Makefile                  // eas commands
genconfig.ts              // generate app config
```
