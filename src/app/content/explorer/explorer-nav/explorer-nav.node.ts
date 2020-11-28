export class ExplorerNavNode implements Iterable<ExplorerNavNode | undefined>{

  name: string;
  link: string;
  child?: ExplorerNavNode;

  constructor(name: string, link: string, child: ExplorerNavNode | undefined) {
    this.name = name;
    this.link = link;
    this.child = child;
  }

  [Symbol.iterator](): Iterator<ExplorerNavNode | undefined> {
    return new ExplorerNavNodeIterator(this);
  }

}

export class ExplorerNavNodeIterator implements Iterator<ExplorerNavNode| undefined> {

  private node: ExplorerNavNode;

  constructor(node: ExplorerNavNode) {
    this.node = node;
  }


  next(): IteratorResult<ExplorerNavNode| undefined> {
    let done = false;

    const child = this.node.child;
    const child2 = child?.child;

    if (!child2) {
      done = true;
    }

    return { done, value: child };
  }





}






