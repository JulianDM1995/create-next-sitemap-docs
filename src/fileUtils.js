import fs from 'fs'
import path from 'path'
import showdown from 'showdown'

export function listPaths(dir, onlyMarkdownFiles, baseDir = null, fileList = []) {
  if (!baseDir) {
    baseDir = dir
  }
  const validFiles = [
    'page.tsx',
    'page.ts',
    'page.jsx',
    'page.js',
    'route.tsx',
    'route.ts',
    'route.jsx',
    'route.js',
  ]
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.lstatSync(filePath).isDirectory()) {
      listPaths(filePath, onlyMarkdownFiles, baseDir, fileList)
    } else if (validFiles.some((ext) => file.endsWith(ext))) {
      const relativePath = path.relative(baseDir, filePath)
      const directoryPath = path.dirname(relativePath)
      const formattedPath = directoryPath === '.' ? '/' : `/${directoryPath}`

      // Check if there's a corresponding markdown file
      const mdFilePathPage = path.join(path.dirname(filePath), 'sitemap.md')
      if (onlyMarkdownFiles && !fs.existsSync(mdFilePathPage)) {
        // Skip if onlyMarkdownFiles is true and no corresponding markdown file exists
        return
      }

      fileList.push({ path: formattedPath, fullPath: filePath })
    }
  })
  return fileList
}

export function getFileContent(fullPath) {
  const markdownFilePathPage = path.join(path.dirname(fullPath), 'sitemap.md')
  let fileContent
  if (fs.existsSync(markdownFilePathPage)) {
    fileContent = fs.readFileSync(markdownFilePathPage, 'utf-8')
    let converter = new showdown.Converter()
    fileContent = converter.makeHtml(fileContent)
  } else {
    fileContent = fs
      .readFileSync(fullPath, 'utf-8')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
  return fileContent
}

export function findDefaultAppPath() {
  const rootDirs = ['app', 'src/app']
  const extensions = ['page.tsx', 'page.jsx', 'page.js', 'route.tsx', 'route.jsx', 'route.js']

  for (const rootDir of rootDirs) {
    const fullPath = path.join(process.cwd(), rootDir)
    if (fs.existsSync(fullPath)) {
      for (const ext of extensions) {
        if (fs.existsSync(path.join(fullPath, ext))) {
          return fullPath
        }
      }
    }
  }
  console.error(
    '❌ No page or route files found in the specified directories (app, src/app). Please ensure you are in the root directory of your Next.js project or specify the correct app directory using the --appPath option. 🛑',
  )
  process.exit(1)
}
