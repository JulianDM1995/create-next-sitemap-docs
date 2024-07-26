# create-next-sitemap-docs

Generate detailed sitemap documentation for your Next.js projects that use the app router. This tool creates a comprehensive HTML file featuring a visual map of your routing architecture along with detailed route documentation. It is designed to maintain scalable documentation compatible with the app router by leveraging the same system and requiring users to have a `sitemap.md` file in the same directory as their Next.js `page` or `route` files. Ideal for both small projects and large applications, `create-next-sitemap-docs` helps you visualize and maintain your app's routing structure effectively.

![Banner](./assets/banner.gif)

## Usage

### Using npx

To use the tool directly without installation, navigate to the root directory of your Next.js project and run:

```sh
npx create-next-sitemap-docs
```

Running this command without any parameters will create a sitemap at `./docs/sitemap.html`.
You can also change the input and output paths using the `--appPath` and `--outputPath` options.

### Recommended Method: Adding to package.json Scripts

The recommended way to use this tool is by adding it to the `scripts` section of your `package.json`. This allows you to easily run the tool as part of your project's workflow.

#### Example of Adding to package.json with Additional Parameters

```json
{
  "scripts": {
    "generate:sitemap": "npx create-next-sitemap-docs --pageTitle \"CONDOR DIGITAL SOLUTIONS\""
  }
}
```

#### Running the Script

After adding the script to your `package.json`, you can run it using:

```sh
npm run generate:sitemap
```

or

```sh
yarn generate:sitemap
```

### Command Line Usage

When you run the tool from the command line, it will recursively search through the directory specified in `--appPath` (./app or ./src/app by default) to find all `page` and `route` files used by the Next.js app router (`page.tsx`, `page.jsx`, `page.js`, `route.tsx`, `route.jsx`, `route.js`). Once it identifies these files, it generates an HTML file that visually maps out the routing architecture of your application. This visual map helps in understanding the structure and flow of your app's routes.

### Markdown Documentation

For each `page` or `route` file, if there is a corresponding `sitemap.md` file in the same directory, the tool will automatically include the content of these markdown files in the generated HTML documentation. This ensures that the visual representation of the routing architecture is accompanied by detailed and specific documentation, making it easier to understand and navigate your codebase.

If the `onlyMarkdownFiles` option is set to `true`, only the routes or pages that have a corresponding `.md` file will be documented. If set to `false` (the default), the tool will use the entire content of the route file (e.g., `page.tsx`) in the documentation, ensuring that all routes are included even if no markdown file is present.

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
npx create-next-sitemap-docs --appPath "./src/app" --outputPath "./docs/sitemap.html" --pageTitle "CONDOR DIGITAL SOLUTIONS" --boxHeight 100
```

This will generate an HTML documentation file containing a comprehensive sitemap with a visual map of your routing architecture. It will include a downloadable PNG graph and detailed route documentation from any accompanying `.md` files, providing a clear and complete overview of your app's routing structure.

## Style Parameters

### Rect Styles

Controls the fill styles for the rectangles in the SVG graph.

| Option         | Type   | Default                                | Description                                 |
| -------------- | ------ | -------------------------------------- | ------------------------------------------- |
| `--rectStyles` | Object | See individual `rectStyle` parameters. | Styles for the rectangles in the SVG graph. |
| `--rectStyle`  | String | 'fill:#BDE3FE'                         | Default fill style for rectangles.          |

Example:

```json
{
  "page-static": "fill:#BDE3FE",
  "route-static": "fill:#FFE8A3",
  "page-dynamic": "fill:#BDE3FE",
  "route-dynamic": "fill:#FFE8A3",
  "page-catch-all": "fill:#BDE3FE",
  "route-catch-all": "fill:#FFE8A3"
}
```

### Line Styles

Controls the stroke styles for the lines in the SVG graph.

| Option         | Type   | Default                                | Description                            |
| -------------- | ------ | -------------------------------------- | -------------------------------------- |
| `--lineStyles` | Object | See individual `lineStyle` parameters. | Styles for the lines in the SVG graph. |
| `--lineStyle`  | String | 'stroke:#21B4FD;stroke-width:3'        | Default stroke style for lines.        |

Example:

```json
{
  "page-static": "stroke:#21B4FD;stroke-width:3",
  "route-static": "stroke:#DDBC22;stroke-width:3",
  "page-dynamic": "stroke:#21B4FD;stroke-width:3;stroke-dasharray:10,10",
  "route-dynamic": "stroke:#DDBC22;stroke-width:3;stroke-dasharray:10,10",
  "page-catch-all": "stroke:#21B4FD;stroke-width:3;stroke-dasharray:5,5",
  "route-catch-all": "stroke:#DDBC22;stroke-width:3;stroke-dasharray:5,5"
}
```

### Text Styles

Controls the fill styles for the text in the SVG graph.

| Option         | Type   | Default                                | Description                           |
| -------------- | ------ | -------------------------------------- | ------------------------------------- |
| `--textStyles` | Object | See individual `textStyle` parameters. | Styles for the text in the SVG graph. |
| `--textStyle`  | String | 'fill:#332F22'                         | Default fill style for text.          |

Example:

```json
{
  "page-static": "fill:#332F22",
  "route-static": "fill:#332F22",
  "page-dynamic": "fill:#332F22",
  "route-dynamic": "fill:#332F22",
  "page-catch-all": "fill:#332F22",
  "route-catch-all": "fill:#332F22"
}
```

### Font Sizes

Controls the font sizes for the text in the SVG graph.

| Option        | Type   | Default                               | Description                                      |
| ------------- | ------ | ------------------------------------- | ------------------------------------------------ |
| `--fontSizes` | Object | See individual `fontSize` parameters. | Font sizes for different types in the SVG graph. |
| `--fontSize`  | Number | 24                                    | Default font size for text.                      |

Example:

```json
{
  "page-static": 24,
  "route-static": 24,
  "page-dynamic": 24,
  "route-dynamic": 24,
  "page-catch-all": 24,
  "route-catch-all": 24
}
```

## Example

To generate a sitemap with customized SVG styles, you can use the following command:

```sh
npx create-next-sitemap-docs --rectStyles '{"page-static":"fill:#FFCDD2","route-static":"fill:#FFE0B2","page-dynamic":"fill:#E1BEE7","route-dynamic":"fill:#C5CAE9","page-catch-all":"fill:#BBDEFB","route-catch-all":"fill:#C8E6C9"}' --lineStyles '{"page-static":"stroke:#E57373;stroke-width:3","route-static":"stroke:#FFB74D;stroke-width:3","page-dynamic":"stroke:#BA68C8;stroke-width:3;stroke-dasharray:10,10","route-dynamic":"stroke:#7986CB;stroke-width:3;stroke-dasharray:10,10","page-catch-all":"stroke:#64B5F6;stroke-width:3;stroke-dasharray:5,5","route-catch-all":"stroke:#81C784;stroke-width:3;stroke-dasharray:5,5"}' --textStyles '{"page-static":"fill:#3E2723","route-static":"fill:#5D4037","page-dynamic":"fill:#7B5E57","route-dynamic":"fill:#8D6E63","page-catch-all":"fill:#A1887F","route-catch-all":"fill:#BCAAA4"}' --fontSizes '{"page-static":18,"route-static":18,"page-dynamic":18,"route-dynamic":18,"page-catch-all":18,"route-catch-all":18}'
```

This command will generate an HTML documentation file containing a comprehensive sitemap with a visual map of your routing architecture, using the specified styles for the SVG elements.

## License

ISC

## Contributing

Feel free to open issues or submit pull requests on [GitHub](https://github.com/JulianDM1995/create-next-sitemap-docs).
