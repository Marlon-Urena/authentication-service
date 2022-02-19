import UserModel from '../database/models/userModel';
import { RegisterError } from '../exceptions/error';
import * as admin from 'firebase-admin';

interface User {
  uid: string;
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
  const lowerCaseTrimmedEmail = newUser.email.toLowerCase().trim();
  const lowerCaseTrimmedUsername = newUser.username.toLowerCase().trim();
  const existingUserWithEmail = await UserModel.findByPk(lowerCaseTrimmedEmail);
  const existingUserWithUsername = await UserModel.findOne({
    where: { username: lowerCaseTrimmedUsername }
  });
  console.log('register');
  if (existingUserWithEmail) {
    throw new RegisterError(
      `There already exists an account with email ${lowerCaseTrimmedEmail}.`,
      409,
      'auth/email-already-exists'
    );
  }
  if (existingUserWithUsername) {
    throw new RegisterError(
      `There already exists an account with username ${lowerCaseTrimmedUsername}.`,
      409,
      'auth/username-already-exists'
    );
  }
  if (!validateEmail(newUser.email)) {
    throw new RegisterError(`Invalid email ${lowerCaseTrimmedEmail}.`, 422, 'auth/email-not-valid');
  }
  if (!validateUsername(newUser.username)) {
    throw new RegisterError(
      `Invalid username ${lowerCaseTrimmedUsername}.`,
      422,
      'auth/username-not-valid'
    );
  }
  if (!validatePassword(newUser.password)) {
    throw new RegisterError('Invalid password format.', 422, 'auth/password-not-valid');
  }

  const userRecord = await admin.auth().createUser({
    email: lowerCaseTrimmedEmail,
    displayName: lowerCaseTrimmedUsername,
    password: newUser.password
  });
  await UserModel.create({
    uid: userRecord.uid,
    email: lowerCaseTrimmedEmail,
    username: lowerCaseTrimmedUsername,
    firstName: newUser.firstName || null,
    lastName: newUser.lastName || null,
    address: newUser.address || null,
    city: newUser.city || null,
    state: newUser.state || null,
    country: newUser.country || null,
    zipCode: newUser.zipCode || null
  });
  console.log('Successfully created new user:', userRecord.email);
}

function validateEmail(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function validateUsername(username: string) {
  return username.match(/^(?=.{1,30}$)[a-zA-Z0-9._]+$/);
}

function validatePassword(password: string) {
  return password.match(/^(?=.*\d)(?![.])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,100}$/);
}
