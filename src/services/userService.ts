import UserAccountEntity from "../database/models/userModel";
import { getAuth } from "firebase-admin/auth";
import UserModel from "../database/models/userModel";
import { RegisterError } from "../exceptions/error";

interface User {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export async function userAccountRegistration(newUser: User) {
  const existingUserWithEmail = await UserAccountEntity.findByPk(newUser.email);
  const existingUserWithUsername = await UserAccountEntity.findOne({ where: { username: newUser.username } });
  if (existingUserWithEmail) {
    throw new RegisterError(`There already exists an account with email ${newUser.email}.`, 409, "auth/email-already-exists");
  }
  if (existingUserWithUsername) {
    throw new RegisterError(`There already exists an account with username ${newUser.username}.`, 409, "auth/username-already-exists");
  }
  if (!validateEmail(newUser.email)) {
    throw new RegisterError(`Invalid email ${newUser.email}.`, 422, 'auth/email-not-valid');
  }
  if (!validateUsername(newUser.username)) {
    throw new RegisterError(`Invalid username ${newUser.username}.`, 422, 'auth/username-not-valid');
  }
  if (!validatePassword(newUser.password)) {
    throw new RegisterError('Invalid password format.', 422, 'auth/password-not-valid')
  }

  getAuth().createUser({
    email: newUser.email,
    displayName: newUser.username,
    password: newUser.password
  }).then((userRecord) => {
    console.log("Successfully created new user:", userRecord.email);
  }).catch((error) => {
    console.log("Error creating new user:", error);
  });
  UserModel.create({
    email: newUser.email,
    username: newUser.username,
    firstName: newUser.firstName || null,
    lastName: newUser.lastName || null,
    address: newUser.address || null,
    city: newUser.city || null,
    state: newUser.state || null,
    country: newUser.country || null,
    zipCode: newUser.zipCode || null
  }).then(() => {
    console.log("Successfully added new user to database.");
  }).catch((error) => {
    console.log("Error creating new user:", error);
    throw new Error(error);
  });
}

function validateEmail(email: string) {
  return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function validateUsername(username: string) {
  return username.match(/^(?=.{1,30}$)[a-zA-Z0-9._]+$/)
}

function validatePassword(password: string) {
  return password.match(/^(?=.*\d)(?![.])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,100}$/)
}

