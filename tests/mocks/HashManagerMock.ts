export class HashManagerMock {
  public hash = async (string: string): Promise<any> => {
    return "hash";
  };

  public compare = async (
    string: string,
    hash: string
  ): Promise<boolean> => {
    return string === hash;
  };
}
