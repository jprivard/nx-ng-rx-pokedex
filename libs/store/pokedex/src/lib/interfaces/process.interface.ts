import { ProcessStatus } from '../enums/process-status.enum';

export interface Process {
  status: ProcessStatus;
  error: Error | null;
}
