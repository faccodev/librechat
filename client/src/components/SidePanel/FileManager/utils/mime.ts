import {
  FileText,
  FileImage,
  FileVideo,
  FileMusic,
  FileCode,
  FileArchive,
  FileSpreadsheet,
  File as FileIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type FileCategory =
  | 'image'
  | 'video'
  | 'audio'
  | 'code'
  | 'archive'
  | 'document'
  | 'spreadsheet'
  | 'other';

const EXT_MAP: Record<string, FileCategory> = {
  // images
  png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', webp: 'image', svg: 'image',
  bmp: 'image', ico: 'image', avif: 'image', heic: 'image', tiff: 'image',
  // video
  mp4: 'video', mov: 'video', webm: 'video', mkv: 'video', avi: 'video', flv: 'video', m4v: 'video',
  // audio
  mp3: 'audio', wav: 'audio', ogg: 'audio', flac: 'audio', m4a: 'audio', aac: 'audio', opus: 'audio',
  // code
  js: 'code', mjs: 'code', ts: 'code', tsx: 'code', jsx: 'code', json: 'code',
  py: 'code', rb: 'code', go: 'code', rs: 'code', java: 'code', c: 'code', h: 'code',
  cpp: 'code', hpp: 'code', cs: 'code', php: 'code', sh: 'code', bash: 'code', zsh: 'code',
  yaml: 'code', yml: 'code', toml: 'code', xml: 'code', html: 'code', css: 'code', scss: 'code',
  sql: 'code', md: 'code', mdx: 'code',
  // archives
  zip: 'archive', tar: 'archive', gz: 'archive', bz2: 'archive', xz: 'archive',
  '7z': 'archive', rar: 'archive', zst: 'archive',
  // documents
  pdf: 'document', doc: 'document', docx: 'document', rtf: 'document', odt: 'document',
  txt: 'document', log: 'document',
  // spreadsheets
  xls: 'spreadsheet', xlsx: 'spreadsheet', csv: 'spreadsheet', ods: 'spreadsheet', tsv: 'spreadsheet',
};

const MIME_PREFIX_MAP: Array<[string, FileCategory]> = [
  ['image/', 'image'],
  ['video/', 'video'],
  ['audio/', 'audio'],
  ['text/html', 'code'],
  ['application/json', 'code'],
  ['application/xml', 'code'],
  ['application/zip', 'archive'],
  ['application/x-tar', 'archive'],
  ['application/x-gzip', 'archive'],
  ['application/x-7z-compressed', 'archive'],
  ['application/x-rar', 'archive'],
  ['application/pdf', 'document'],
  ['application/msword', 'document'],
  ['application/vnd.openxmlformats-officedocument', 'spreadsheet'],
  ['application/vnd.ms-excel', 'spreadsheet'],
];

const CATEGORY_ICON: Record<FileCategory, LucideIcon> = {
  image: FileImage,
  video: FileVideo,
  audio: FileMusic,
  code: FileCode,
  archive: FileArchive,
  document: FileText,
  spreadsheet: FileSpreadsheet,
  other: FileIcon,
};

export const getFileCategory = (name: string, mime?: string): FileCategory => {
  if (mime) {
    for (const [prefix, category] of MIME_PREFIX_MAP) {
      if (mime.startsWith(prefix)) return category;
    }
  }
  const dotIndex = name.lastIndexOf('.');
  if (dotIndex === -1) return 'other';
  const ext = name.slice(dotIndex + 1).toLowerCase();
  return EXT_MAP[ext] ?? 'other';
};

export const getCategoryIcon = (category: FileCategory): LucideIcon => CATEGORY_ICON[category];
