import { ChimericRead } from 'src/utils/domain/ChimericRead';
import { Review } from '../Review';

export type IReviewRepository = {
  save: (review: Review) => void;
  delete: () => void;
  get: ChimericRead<() => Review | undefined>;
};
