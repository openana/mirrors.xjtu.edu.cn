export interface IFiles {
  data: IFilesData[];
  loading: boolean;
  error?: any;
}

export interface IFilesData {
  mtime?: string;
  name: string;
  size?: number;
  type: string;
  lastModified?: Date;
}

export interface IMirrors {
  data: IMirrorsData[];
  error?: any;
}

export interface IMirrorsData {
  id: string;
  name: string;
  type?: string;
  desc?: string;
  docs?: string;
  alts?: string[];
  tags?: string[];
  status?: string;
  started_at?: Date;
  updated_at?: Date;
  success_at?: Date;
  nxtsync_at?: Date;
}
