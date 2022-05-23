import { User } from "../../../src/model/User";
import { otherUserMock, userMock } from "./userMock";

export class UserDatabaseMock {
  public signup = async (user: User): Promise<void> => {};

  public getUserByEmail = async (email: string): Promise<User | undefined> => {
    if (email === "email mockado") {
      return userMock;
    } else if (email === "outro email mockado") {
      return otherUserMock;
    } else {
      return undefined;
    }
  };

  public getUserById = async (id: string): Promise<User | undefined> => {
    if (id === "id mockado") {
      return userMock;
    } else if (id === "outro id mockado") {
      return otherUserMock;
    } else {
      return undefined;
    }
  };

  public getUserByName = async (name: string): Promise<User | undefined> => {
    if (name === "nome mockado") {
      return userMock;
    } else if (name === "outro nome mockado") {
      return otherUserMock;
    } else {
      return undefined;
    }
  };
}
