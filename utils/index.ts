export function getQuestionsFromData (esQuestions: any[]) {
  if (esQuestions) {
    return esQuestions.map((q) => {
      return {
        id: q._id,
        question: q._source.question,
        comments: q._source.comments,
        createdDate: q._source.createdDate,
        likes: q._source.likes
      }
    })
  } else {
    return []
  }
}

export function getCommentFromData (esComment: any) {
  if (esComment) {
    return {
      id: esComment._id,
      comment: esComment._source.comment,
      likes: esComment._source.likes,
      authorId: esComment._source.authorId,
      parentId: esComment._source.parentId,
      commentIds: esComment._source.commentIds
    }
  } else {
    return null
  }
}

export const msToTime = (time: any) => {
  const newDate: any = new Date()
  const date: any = new Date(time)
  // it just works ok, gosh :)
  let s = newDate - date

  const ms = s % 1000
  s = (s - ms) / 1000
  const secs = s % 60
  s = (s - secs) / 60
  const mins = s % 60
  s = (s - mins) / 60
  const hrs = s % 60
  s = (s - hrs) / 24
  const days = s % 24

  if (days) {
    return days + ' days ago'
  } else if (hrs) {
    return hrs + ' hours ago'
  } else {
    return mins + ' minutes ' + secs + ' seconds ago'
  }
}

export const msToDate = (time: any) => {
  const date: any = new Date(time)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
