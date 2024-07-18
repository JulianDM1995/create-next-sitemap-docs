import path from 'path'

export function formatPaths(paths) {
  const sortedPaths = paths.sort((a, b) => a.path.localeCompare(b.path))
  return sortedPaths.map((item) => {
    const parts = item.path.split('/').filter((part) => part !== '')
    const formattedPath = '/' + parts.join('/')

    const parentDir = path.basename(path.dirname(item.fullPath))
    let routeType = 'static'
    if (parentDir.startsWith('[...') && parentDir.endsWith(']')) {
      routeType = 'catch-all'
    } else if (parentDir.startsWith('[') && parentDir.endsWith(']')) {
      routeType = 'dynamic'
    }

    let type = ''
    const fileName = path.basename(item.fullPath)
    if (fileName.startsWith('route')) {
      type = 'Route'
    } else if (fileName.startsWith('page')) {
      type = 'Page'
    }

    return { ...item, formattedPath, type, routeType }
  })
}
