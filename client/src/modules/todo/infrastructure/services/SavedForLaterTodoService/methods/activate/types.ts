import { ActivateBody } from 'src/modules/todo/domain/dtos/ActivateBody';

export type IActivate = (args: ActivateBody) => Promise<{ id: string }>;
