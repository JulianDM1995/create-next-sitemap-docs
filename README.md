# create-next-sitemap-docs

Generate comprehensive sitemap documentation for your Next.js projects, including a downloadable SVG graph, detailed route map with accompanying .md documentation, and full support for the app router. This tool is designed to help developers easily visualize and document the structure of their Next.js applications, making it simpler to understand and maintain their projects. Whether you are working on a small project or a large application, `create-next-sitemap-docs` provides a clear and organized representation of your app's routing structure.

![Banner](./assets/banner.gif)

## Installation

You can install this package via npm:

```sh
npm install -g create-next-sitemap-docs
```

Or use it directly with `npx`:

```sh
npx create-next-sitemap-docs --appPath "./src/app/" --outputPath "./docs"
```

## Usage

### Config Options

| Option                | Type    | Default                             | Description                                                        |
| --------------------- | ------- | ----------------------------------- | ------------------------------------------------------------------ |
| `--appPath`           | String  | Current working directory           | Path to the Next.js app directory.                                 |
| `--outputPath`        | String  | `sitemap.html` in current directory | Path where the generated HTML file will be saved.                  |
| `--pageTitle`         | String  | `Next App Map`                      | Title for the generated HTML page.                                 |
| `--onlyMarkdownFiles` | Boolean | `false`                             | If `true`, only includes routes that have corresponding .md files. |

### SVG Options

![Parameters](./assets/svg-params.png)

| Option          | Type   | Default | Description                                  |
| --------------- | ------ | ------- | -------------------------------------------- |
| `--fontSize`    | Number | 28      | Font size for the SVG graph text.            |
| `--boxWidth`    | Number | 200     | Width of each box in the SVG graph.          |
| `--boxHeight`   | Number | 50      | Height of each box in the SVG graph.         |
| `--boxRadius`   | Number | 4       | Border radius of each box in the SVG graph.  |
| `--tabWidth`    | Number | 60      | Width of the tabs in the SVG graph.          |
| `--verticalGap` | Number | 20      | Vertical gap between boxes in the SVG graph. |
| `--barGap`      | Number | 30      | Gap between bars in the SVG graph.           |

## Example

```sh
npx create-next-sitemap-docs --appPath "./src/app/(webapp)" --outputPath "./scripts/sitemap.html" --pageTitle "CONDOR DIGITAL SOLUTIONS"
```

This will generate an HTML file with a sitemap including a downloadable SVG graph, a route map with .md documentation, and support for the app router.

## License

ISC

## Contributing

Feel free to open issues or submit pull requests on [GitHub](https://github.com/JulianDM1995/create-next-sitemap-docs).
