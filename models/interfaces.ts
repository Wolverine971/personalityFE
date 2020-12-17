export interface selectedQuestion {
  id: string
  text: string
  likes: string[]
  commentIds: string[]
  authorId: string
}

export interface comment {
  id: string
  text: string
  commentIds: string[]
  authorId: string
  likes: string[]
  parentId: string
}
