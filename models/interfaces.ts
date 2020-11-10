export interface Scraping {
  title: string

  index: string

  section: string

  url: string

  rootNode: boolean
}

export interface AllScrapings {
  url: string

  data: Scraping[]
}

export interface IndividualSentence {
  word: string

  body: {
    date: string
    url: string
    sentences: string
  }
}

export interface EsDoc {
  _index: string

  _type: string

  _id: string

  _score: number

  _source: Source
}

export interface Source {
  section: string

  title: string

  url: string

  date: string

  rootNode: boolean
}

export interface ScrapedSentencesObj {
  word: string

  body: {
    date: string | Date
    url: string
    sentences: string | any[]
  }
}

export interface EsIndex {
  health: string

  status: string

  index: string

  uuid: string

  pri: string

  rep: string

  'docs.count': string

  'docs.deleted': string

  'store.size': string

  'pri.store.size': string
}

export interface Screenshot {
  url: string

  word: string

  screenshot: string | ArrayBuffer
}

export interface SearchResult {
  title: string
  id: string
  url: string
  section: string
}

export interface AnalyzedTextResponse {
  response: AnalyzedTextBody[]
}

export interface AnalyzedTextBody {
  _index: string
  _type: string
  _id: string
  _score: number
  _source: AnalyzedText
}

// export interface AnalyzedText {
//   index: string
//   rootNode: boolean
//   section: string
//   sentences: Sentence[]
//   title: string
//   url: string
// }

// interface Sentence {
//   info: Info
//   sentence: string
//   hover?: boolean
// }

// interface Info {
//   verbs: Verb[]
//   words: string[]
// }

// interface Verb {
//   description: string
//   tags: string[]
//   verb: string
//   spo?: boolean
// }

export interface AnalyzedText {
  index: string;
  rootNode: boolean;
  section: string;
  'sectionSub'?: Sectionsub;
  sentences: Sentence[];
  title: string;
  url: string;
}

export interface Sentence {
  info: Info;
  sentence: string;
  hover?: boolean;
}

interface Info {
  verbs: Verb[];
  words: string[];
}

interface Verb {
  description: string;
  tags: string[];
  verb: string;
  spo?: boolean;
}

interface Sectionsub {
  antecedent_indices: number[][];
  clusters: number[][][];
  document: string[];
  predicted_antecedents: number[];
  top_spans: number[][];
}

export interface selectedQuestion {
  id: string,
  text: string,
  likes: string[],
  commentIds: string[],
  authorId: string
}

export interface comment {
  id: string,
  text: string,
  commentIds: string[],
  authorId: string,
  likes: string[],
  parentId: string
}
