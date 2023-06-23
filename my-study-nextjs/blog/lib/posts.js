import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 해당 프로젝트의 root 경로 + '/posts' <- md 파일을 저장해둔 경로
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // 파일 이름을 읽어온다
  const fileNames = fs.readdirSync(postsDirectory)

  // 파일 이름에서 '.md'라는 텍스트를 지운다
  // ssg-ssr.md -> ssg-ssr : 이를 id로 가져가고 있다
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // postsDirectory + '/pre-rendering.md'
    const fullPath = path.join(postsDirectory, fileName)

    // 파일을 직접 읽기
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // meta 데이터 읽기
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })

  // date를 기준으로 sort
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
