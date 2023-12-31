// import { Dispatch, SetStateAction } from "react";

export interface FormElements extends HTMLFormControlsCollection {
  size: HTMLInputElement;
  input: HTMLInputElement;
  firstInput: HTMLInputElement;
  position: HTMLInputElement;
  operations: HTMLSelectElement;
  priority: HTMLInputElement;
  hasElementInput: HTMLInputElement;
  addElementInput: HTMLInputElement;
  removeElementInput: HTMLInputElement;
  isWordElementInput: HTMLInputElement;
}

export interface InputFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export interface StackValueInterface {
  value: number | string;
  selectedOperation: string;
}

export interface InputValueInterface {
  value: number | string;
  selectedOperation: string;
}

export interface NodeInterface<T> {
  value: T | null;
  next?: NodeInterface<T> | null;
}

export interface LinkedList<T> {
  head: NodeInterface<T> | null;
}

export interface PriorityQueue {
  value: number | string;
  priority: number;
}

export interface TrieNodeInterface {
  keys: Map<string, TrieNodeInterface>;
  end: boolean;
  setEnd: () => void;
  isEnd: () => boolean;
}

export interface TreeInterface {
  name: string;
  children: TreeInterface[];
}