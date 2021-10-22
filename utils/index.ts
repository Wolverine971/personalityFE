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
  // debugger
  const newDate: any = new Date().getTime()
  let date: any = new Date(time).getTime()
  // it just works ok, gosh :)
  const differenceInTime = newDate - date

  const differenceInDays = differenceInTime / (1000 * 3600 * 24)
  if (differenceInDays < 1) {
    const hours = differenceInDays * 24
    console.log(hours)
    const newHours = Math.floor(hours)
    if (newHours < 1) {
      console.log(new Date(time))
      const minutes = Math.floor(hours * 60)
      return minutes + ((minutes === 1) ? ' minute ago' : ' minutes ago')
    } else {
      const newHours = Math.floor(hours)
      return newHours + ((newHours === 1) ? ' hour ago' : ' hours ago')
    }
  } else if (differenceInDays > 30) {
    date = new Date(time)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  } else {
    const days = Math.floor(differenceInDays)
    return days + ((days === 1) ? ' day ago' : ' days ago')
  }

  // const ms = s % 1000
  // s = (s - ms) / 1000
  // const secs = s % 60
  // s = (s - secs) / 60
  // const mins = s % 60
  // s = (s - mins) / 60
  // const hrs = s % 60
  // s = (s - hrs) / 24
  // const days = s % 24

  // if (days) {
  //   return days + ' days ago'
  // } else if (hrs) {
  //   return hrs + ' hours ago'
  // } else {
  //   return mins + ' minutes ' + secs + ' seconds ago'
  // }
}

export const msToDate = (time: any) => {
  const date: any = new Date(time)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
