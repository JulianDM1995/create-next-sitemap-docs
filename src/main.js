import fs from 'fs'
import path from 'path'
import { listPaths } from '../src/fileUtils.js'
import { formatPaths } from '../src/helpers.js'
import { generateHTMLContent } from '../src/htmlGenerator.js'
import { generateSVGContent } from '../src/svgGenerator.js'

function init() {
  const args = process.argv.slice(2)
  const argMap = {}

  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      argMap[key] = args[index + 1]
    }
  })

  const appPath = argMap.appPath || process.cwd()
  const outputPath = argMap.outputPath || path.join(process.cwd(), 'sitemap.html')
  const onlyMarkdownFiles = argMap.onlyMarkdownFiles === 'true'
  const pageTitle = argMap.pageTitle || 'Next App Map'
  const fontSize = argMap.fontSize ? parseInt(argMap.fontSize) : 28
  const boxWidth = argMap.boxWidth ? parseInt(argMap.boxWidth) : 200
  const boxHeight = argMap.boxHeight ? parseInt(argMap.boxHeight) : 50
  const boxRadius = argMap.boxRadius ? parseInt(argMap.boxRadius) : 4
  const tabWidth = argMap.tabWidth ? parseInt(argMap.tabWidth) : 60
  const verticalGap = argMap.verticalGap ? parseInt(argMap.verticalGap) : 20
  const barGap = argMap.barPosition ? parseInt(argMap.barGap) : 30

  const pathsList = listPaths(appPath, onlyMarkdownFiles)

  if (pathsList.length === 0) {
    console.error('❌ No page or route files found in the directory and subdirectories. 🛑')
    process.exit(1)
  }

  const formattedPaths = formatPaths(pathsList)

  const svgContent = generateSVGContent(
    formattedPaths,
    boxWidth,
    boxHeight,
    boxRadius,
    tabWidth,
    verticalGap,
    barGap,
    fontSize,
  )

  const htmlContent = generateHTMLContent(formattedPaths, svgContent, pageTitle)

  let outputHtmlPath = outputPath
  if (!outputHtmlPath.endsWith('.html')) {
    outputHtmlPath += '.html'
  }
  const outputDir = path.dirname(outputHtmlPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(outputPath, htmlContent)
  console.log(`✅ Sitemap documentation generated and saved at: ${outputPath} 🚀`)
}

init()
