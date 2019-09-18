import { IControl } from './control';

export interface IProposal {
    category: number;
    id: number;
    controls: IControl[];

}