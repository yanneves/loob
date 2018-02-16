export interface ConditionInterface {
  left: string | number;
  right: string | number;
  op: string;
}

export interface BranchInterface {
  els: BranchInterface | null;
  cond: ConditionInterface;
  result: string;
}
