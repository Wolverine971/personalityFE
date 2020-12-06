export function getQuestionsFromData(esQuestions: any[]) {
  if (esQuestions) {
    return esQuestions.map((q) => {
      return {
        id: q._id,
        question: q._source.question,
      }
    })
  } else {
    return []
  }
}

export function getCommentFromData(esComment: any) {
  if (esComment) {
    // return esComments.map((c) => {
    return {
      id: esComment._id,
      comment: esComment._source.comment,
      likes: esComment._source.likes,
      authorId: esComment._source.authorId,
      parentId: esComment._source.parentId,
      commentIds: esComment._source.commentIds,
    }
  } else {
    return null
  }
}
